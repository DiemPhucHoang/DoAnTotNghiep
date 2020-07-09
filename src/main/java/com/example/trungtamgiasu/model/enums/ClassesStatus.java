package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum  ClassesStatus {
    CHOXACNHAN("Chờ xác nhận", 0),
    LOPMOI("Lớp mới", 1),
    LOPDAGIAO("Lớp đã giao", 2),
    LOPBIHUY("Lớp bị hủy", 3);

    private final String key;
    private final Integer value;

    ClassesStatus(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static ClassesStatus from(String key) {
        switch (key) {
            case "Chờ xác nhận":
                return ClassesStatus.CHOXACNHAN;
            case "Lớp mới":
                return ClassesStatus.LOPMOI;
            case "Lớp đã giao":
                return ClassesStatus.LOPDAGIAO;
            case "Lớp bị hủy":
                return ClassesStatus.LOPBIHUY;
            default:
                return null;
        }
    }

    public static ClassesStatus from(Integer value) {
        switch (value) {
            case 0:
                return ClassesStatus.CHOXACNHAN;
            case 1:
                return ClassesStatus.LOPMOI;
            case 2:
                return ClassesStatus.LOPDAGIAO;
            case 3:
                return ClassesStatus.LOPBIHUY;
            default:
                return null;
        }
    }


}
