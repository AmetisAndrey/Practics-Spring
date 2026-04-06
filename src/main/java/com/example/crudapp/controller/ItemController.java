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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Controller
@RequestMapping("/list")
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    @LogExecutionTime
    public String list(@RequestParam(required = false) String search,
                       @RequestParam(defaultValue = "0") int page,
                       @RequestParam(defaultValue = "10") int size,
                       @RequestParam(defaultValue = "createdAt") String sort,
                       @RequestParam(defaultValue = "desc") String dir,
                       Model model) {

        Sort.Direction direction = dir.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(direction, sort));
        Page<ItemDto> itemPage = itemService.getAll(search, pageRequest);

        model.addAttribute("itemsPage", itemPage);
        model.addAttribute("search", search);
        model.addAttribute("sort", sort);
        model.addAttribute("dir", dir);

        return "list";
    }

    @GetMapping("/new")
    public String createForm(Model model) {
        model.addAttribute("item", new ItemCreateUpdateDto());
        model.addAttribute("isNew", true);
        return "form";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute("item") ItemCreateUpdateDto dto,
                         BindingResult bindingResult,
                         Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("isNew", true);
            return "form";
        }
        itemService.create(dto);
        return "redirect:/list";
    }

    @GetMapping("/{id}/edit")
    public String editForm(@PathVariable UUID id, Model model) {
        ItemDto item = itemService.getById(id);
        ItemCreateUpdateDto dto = new ItemCreateUpdateDto();
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());

        model.addAttribute("itemId", id);
        model.addAttribute("item", dto);
        model.addAttribute("isNew", false);
        return "form";
    }

    @PostMapping("/{id}")
    public String update(@PathVariable UUID id,
                         @Valid @ModelAttribute("item") ItemCreateUpdateDto dto,
                         BindingResult bindingResult,
                         Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("itemId", id);
            model.addAttribute("isNew", false);
            return "form";
        }
        itemService.update(id, dto);
        return "redirect:/list";
    }

    @PostMapping("/{id}/delete")
    public String delete(@PathVariable UUID id) {
        itemService.delete(id);
        return "redirect:/list";
    }
}