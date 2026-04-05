package com.example.crudapp.extensions;

import com.example.crudapp.entity.Item;
import manifold.ext.rt.api.Extension;
import manifold.ext.rt.api.This;
import java.time.Instant;

@Extension
public class StringExtensions {

    public static boolean isValid(@This Item self) {
        return self.getName() != null && !self.getName().isBlank() &&
                self.getName().length() >= 3 && self.getName().length() <= 50;
    }

    public static String display(@This Item self) {
        return String.format("Item[id=%s, name='%s']", self.getId(), self.getName());
    }

    public static Item copy(@This Item self) {
        Item copy = new Item();
        copy.setName(self.getName());
        copy.setDescription(self.getDescription());
        copy.setCreatedAt(self.getCreatedAt());
        copy.setUpdatedAt(self.getUpdatedAt());
        return copy;
    }

    public static Item updateWithValidation(@This Item self, String name, String description) {
        if (name != null && !name.isBlank() && name.length() >= 3 && name.length() <= 50) {
            self.setName(name);
        }
        if (description != null && description.length() <= 255) {
            self.setDescription(description);
        }
        self.setUpdatedAt(Instant.now());
        return self;
    }

    public static boolean isValidName(@This String self) {
        return self != null && !self.isBlank() && self.length() >= 3 && self.length() <= 50;
    }

    public static String truncate(@This String self, int maxLength) {
        if (self == null) return null;
        return self.length() <= maxLength ? self : self.substring(0, maxLength) + "...";
    }
}