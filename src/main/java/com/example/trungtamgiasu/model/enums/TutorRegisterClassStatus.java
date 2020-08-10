package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum TutorRegisterClassStatus {
    DANHANLOP("Đã nhận lớp", 0),
    XEMXET("Xem xét", 1),
    KHONGDAT("Không đạt", 2),
    DAHUY("Đã hủy",3),
    DANHANLOP_PARENT("Đã nhận lớp - phụ huynh chọn", 4);

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
            case "Xem xét":
                return TutorRegisterClassStatus.XEMXET;
            case "Không đạt":
                return TutorRegisterClassStatus.KHONGDAT;
            case "Đã hủy":
                return TutorRegisterClassStatus.DAHUY;
            case "Đã nhận lớp - phụ huynh chọn":
                return TutorRegisterClassStatus.DANHANLOP_PARENT;
            default:
                return null;
        }
    }

    public static TutorRegisterClassStatus from(Integer value) {
        switch (value) {
            case 0:
                return TutorRegisterClassStatus.DANHANLOP;
            case 1:
                return TutorRegisterClassStatus.XEMXET;
            case 2:
                return TutorRegisterClassStatus.KHONGDAT;
            case 3:
                return TutorRegisterClassStatus.DAHUY;
            case 4:
                return TutorRegisterClassStatus.DANHANLOP_PARENT;
            default:
                return null;
        }
    }
}
