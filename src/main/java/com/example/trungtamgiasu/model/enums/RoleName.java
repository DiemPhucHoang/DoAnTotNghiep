package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum RoleName {
    ROLE_ADMIN("ADMIN", 0),
    ROLE_TUTOR("TUTOR", 1),
    ROLE_PARENT("PARENT", 2);

    private final String key;
    private final Integer value;

    RoleName(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static RoleName from(String key) {
        switch (key) {
            case "ADMIN":
                return RoleName.ROLE_ADMIN;
            case "TUTOR":
                return RoleName.ROLE_TUTOR;
            case "PARENT":
                return RoleName.ROLE_PARENT;
            default:
                return null;
        }
    }

    public static RoleName from(Integer value) {
        switch (value) {
            case 0:
                return RoleName.ROLE_ADMIN;
            case 1:
                return RoleName.ROLE_TUTOR;
            case 2:
                return RoleName.ROLE_PARENT;
            default:
                return null;
        }
    }
}
