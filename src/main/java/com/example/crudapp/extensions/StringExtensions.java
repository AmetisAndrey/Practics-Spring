package com.example.crudapp.extensions;

import com.example.crudapp.entity.Item;
import manifold.ext.rt.api.Extension;
import manifold.ext.rt.api.This;

import java.time.Instant;

@Extension
public class StringExtensions {
    // check valid
    public static boolean isValid(@This Item self){
        return self.getName() != null && !self.getName().isBlank() &&
                self.getName().length() >= 3 && self.getName().length() <= 50;
    }

    //Formatted display
    public static String display(@This Item self){
        return String.format("Item[id=%s, name='%s']",
                self.getId(), self.getName());
    }

    // Created Copy
    public static Item copy(@This Item self){
        Item copy = new Item();
        copy.setName(self.getName());
        copy.setDescription(self.getDescription());
        copy.setCreatedAt(self.getCreatedAt());
        copy.setUpdatedAt(self.getUpdatedAt());
        return copy;
    }

    // Update with verification
    public static Item updateWithValidation(@This Item self, String name, String description){
        if (name != null && !name.isBlank()){
            self.setName(name);
        }
        if (description != null){
            self.setDescription(description);
        }
        self.setUpdatedAt(Instant.now());
        return self;
    }
}
