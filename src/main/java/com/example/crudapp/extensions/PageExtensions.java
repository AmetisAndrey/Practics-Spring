package com.example.crudapp.extensions;

import manifold.ext.rt.api.Extension;
import manifold.ext.rt.api.This;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Extension
public class PageExtensions {

    public static boolean isEmpty(@This Page<?> self) {
        return self == null || !self.hasContent();
    }

    public static <T> List<T> toLimitedList(@This Page<T> self, int limit) {
        if (self.isEmpty()) return List.of();
        return self.getContent().stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    public static String paginationInfo(@This Page<?> self) {
        if (self == null) return "No data";
        return "Page %d of %d (Total: %d elements)".formatted(
                self.getNumber() + 1,
                self.getTotalPages(),
                self.getTotalElements()
        );
    }
}