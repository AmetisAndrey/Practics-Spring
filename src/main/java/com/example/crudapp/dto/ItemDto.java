package com.example.crudapp.dto;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class ItemDto {
    private UUID id;
    private String name;
    private String description;
    private Instant createdAt;
    private Instant updatedAt;
}
