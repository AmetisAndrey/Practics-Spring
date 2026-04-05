package com.example.crudapp.extensions;

import com.example.crudapp.entity.Item;
import manifold.ext.rt.api.Extension;
import manifold.ext.rt.api.This;
import java.time.Instant;

@Extension
public class ItemExtensions {

    public static boolean isRecentlyCreated(@This Item self) {
        if (self.getCreatedAt() == null) return false;
        Instant dayAgo = Instant.now().minusSeconds(86400);
        return self.getCreatedAt().isAfter(dayAgo);
    }

    public static boolean needsUpdate(@This Item self) {
        if (self.getUpdatedAt() == null) return true;
        Instant weekAgo = Instant.now().minusSeconds(604800);
        return self.getUpdatedAt().isBefore(weekAgo);
    }

    public static String getDescriptionOrDefault(@This Item self, String defaultValue) {
        return self.getDescription() == null || self.getDescription().isBlank()
                ? defaultValue
                : self.getDescription();
    }
}