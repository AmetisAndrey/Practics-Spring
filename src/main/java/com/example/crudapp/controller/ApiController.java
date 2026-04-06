package com.example.crudapp.controller;

import com.example.crudapp.annotation.LogExecutionTime;
import com.example.crudapp.dto.ItemCreateUpdateDto;
import com.example.crudapp.dto.ItemDto;
import com.example.crudapp.service.ItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@Slf4j
public class ApiController {

    private final ItemService itemService;

    @GetMapping
    @LogExecutionTime
    public ResponseEntity<Page<ItemDto>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(itemService.getAll(search, PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDto> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(itemService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody ItemCreateUpdateDto dto) {
        itemService.create(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable UUID id, @Valid @RequestBody ItemCreateUpdateDto dto) {
        itemService.update(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        itemService.delete(id);
        return ResponseEntity.ok().build();
    }
}