package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum TutorStatus {
    CHUANHANLOP("Chưa nhận lớp", 0),
    DANHANLOP("Đã nhận lớp", 1);

    private final String key;
    private final Integer value;

    TutorStatus(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static TutorStatus from(String key) {
        switch (key) {
            case "Chưa nhận lớp":
                return TutorStatus.CHUANHANLOP;
            case "Đã nhận lớp":
                return TutorStatus.DANHANLOP;
            default:
                return null;
        }
    }

    public static TutorStatus from(Integer value) {
        switch (value) {
            case 0:
                return TutorStatus.CHUANHANLOP;
            case 1:
                return TutorStatus.DANHANLOP;
            default:
                return null;
        }
    }
}
