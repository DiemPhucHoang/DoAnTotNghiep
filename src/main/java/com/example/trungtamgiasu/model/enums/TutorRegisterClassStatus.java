package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum TutorRegisterClassStatus {
    DANHANLOP("Đã nhận lớp", 0),
    DUDIEUKIEN("Đủ điều kiện", 1),
    XEMXET("Xem xét", 2),
    KHONGDAT("Không đạt", 3),
    DAHUY("Đã hủy",4);

    private final String key;
    private final Integer value;

    TutorRegisterClassStatus(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static TutorRegisterClassStatus from(String key) {
        switch (key) {
            case "Đã nhận lớp":
                return TutorRegisterClassStatus.DANHANLOP;
            case "Đủ điều kiện":
                return TutorRegisterClassStatus.DUDIEUKIEN;
            case "Xem xét":
                return TutorRegisterClassStatus.XEMXET;
            case "Không đạt":
                return TutorRegisterClassStatus.KHONGDAT;
            case "Đã hủy":
                return TutorRegisterClassStatus.DAHUY;
            default:
                return null;
        }
    }

    public static TutorRegisterClassStatus from(Integer value) {
        switch (value) {
            case 0:
                return TutorRegisterClassStatus.DANHANLOP;
            case 1:
                return TutorRegisterClassStatus.DUDIEUKIEN;
            case 2:
                return TutorRegisterClassStatus.XEMXET;
            case 3:
                return TutorRegisterClassStatus.KHONGDAT;
            case 4:
                return TutorRegisterClassStatus.DAHUY;
            default:
                return null;
        }
    }
}
