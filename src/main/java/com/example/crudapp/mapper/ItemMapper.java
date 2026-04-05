package com.example.crudapp.mapper;

import com.example.crudapp.dto.ItemCreateUpdateDto;
import com.example.crudapp.dto.ItemDto;
import com.example.crudapp.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {

    public ItemDto toDto(Item entity) {
        if (entity == null) return null;
        ItemDto dto = new ItemDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    public Item toEntity(ItemCreateUpdateDto dto) {
        if (dto == null) return null;
        Item entity = new Item();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }

    public void updateEntity(Item entity, ItemCreateUpdateDto dto) {
        if (entity == null || dto == null) return;
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
    }
}