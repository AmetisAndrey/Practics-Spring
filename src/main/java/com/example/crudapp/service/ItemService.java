package com.example.crudapp.service;

import com.example.crudapp.annotation.LogExecutionTime;
import com.example.crudapp.dto.ItemCreateUpdateDto;
import com.example.crudapp.dto.ItemDto;
import com.example.crudapp.entity.Item;
import com.example.crudapp.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ItemService {

    private final ItemRepository itemRepository;

    @LogExecutionTime
    @Transactional(readOnly = true)
    public Page<ItemDto> getAll(String search, Pageable pageable) {
        Page<Item> page;
        if (search == null || search.isBlank()) {
            page = itemRepository.findAll(pageable);
        } else {
            page = itemRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    search, search, pageable);
        }
        return page.map(this::toDto);
    }

    @Transactional(readOnly = true)
    public ItemDto getById(UUID id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
        return toDto(item);
    }

    public void create(ItemCreateUpdateDto dto) {
        Item item = new Item();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        Item saved = itemRepository.save(item);
        log.info("Created new item with id: {}", saved.getId());
    }

    public void update(UUID id, ItemCreateUpdateDto dto) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Item not found: " + id));
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        itemRepository.save(item);
        log.info("Updated item with id: {}", id);
    }

    public void delete(UUID id) {
        itemRepository.deleteById(id);
        log.info("Deleted item with id: {}", id);
    }

    private ItemDto toDto(Item entity) {
        ItemDto dto = new ItemDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}