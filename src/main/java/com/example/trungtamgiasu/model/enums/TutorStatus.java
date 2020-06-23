package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum  TutorStatus {
    ACTIVE("Active", 0),
    DISABLED("Disabled", 1);

    private final String key;
    private final Integer value;

    TutorStatus(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static TutorStatus from(String key) {
        switch (key) {
            case "Active":
                return TutorStatus.ACTIVE;
            case "Disabled":
                return TutorStatus.DISABLED;
            default:
                return null;
        }
    }

    public static TutorStatus from(Integer value) {
        switch (value) {
            case 0:
                return TutorStatus.ACTIVE;
            case 1:
                return TutorStatus.DISABLED;
            default:
                return null;
        }
    }
}
