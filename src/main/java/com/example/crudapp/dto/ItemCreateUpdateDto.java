package com.example.crudapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ItemCreateUpdateDto {

    @NotBlank(message = "Имя обязательно")
    @Size(min = 3, max = 50, message = "Имя должно быть от 3 до 50 символов")
    private String name;

    @Size(max = 255, message = "Описание не должно превышать 255 символов")
    private String description;
}
