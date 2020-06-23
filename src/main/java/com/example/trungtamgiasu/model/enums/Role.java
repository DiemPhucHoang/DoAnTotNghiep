package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum Role {
    ROLE_ADMIN("ADMIN", 0),
    ROLE_TUTOR("TUTOR", 1),
    ROLE_PARENT("PARENT", 2);


    private final String key;
    private final Integer value;

    Role(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static Role from(String key) {
        switch (key) {
            case "ADMIN":
                return Role.ROLE_ADMIN;
            case "TUTOR":
                return Role.ROLE_TUTOR;
            case "PARENT":
                return Role.ROLE_PARENT;
            default:
                return null;
        }
    }

    public static Role from(Integer value) {
        switch (value) {
            case 0:
                return Role.ROLE_ADMIN;
            case 1:
                return Role.ROLE_TUTOR;
            case 2:
                return Role.ROLE_PARENT;
            default:
                return null;
        }
    }
}
