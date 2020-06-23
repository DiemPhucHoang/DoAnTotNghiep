package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum Grade {

    Lop1("Lớp 1", 1),
    Lop2("Lớp 2", 2),
    Lop3("Lớp 3", 3),
    Lop4("Lớp 4", 4),
    Lop5("Lớp 5", 5),
    Lop6("Lớp 6", 6),
    Lop7("Lớp 7", 7),
    Lop8("Lớp 8", 8),
    Lop9("Lớp 9", 9),
    Lop10("Lớp 10", 10),
    Lop11("Lớp 11", 11),
    Lop12("Lớp 12", 12),
    OnDaiHoc("Ôn đại học", 13),
    LopNangKhieu("Lớp năng khiếu",14),
    LopKhac("Lớp khác", 15);

    private final String key;
    private final Integer value;

    Grade(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static Grade from(String key) {
        switch (key) {
            case "Lớp 1":
                return Grade.Lop1;
            case "Lớp 2":
                return Grade.Lop2;
            case "Lớp 3":
                return Grade.Lop3;
            case "Lớp 4":
                return Grade.Lop4;
            case "Lớp 5":
                return Grade.Lop5;
            case "Lớp 6":
                return Grade.Lop6;
            case "Lớp 7":
                return Grade.Lop7;
            case "Lớp 8":
                return Grade.Lop8;
            case "Lớp 9":
                return Grade.Lop9;
            case "Lớp 10":
                return Grade.Lop10;
            case "Lớp 11":
                return Grade.Lop11;
            case "Lớp 12":
                return Grade.Lop12;
            case "Ôn đại học":
                return Grade.OnDaiHoc;
            case "Lớp năng khiếu":
                return Grade.LopNangKhieu;
            case "Lớp khác":
                return Grade.LopKhac;
            default:
                return null;
        }
    }

    public static Grade from(Integer value) {
        switch (value) {
            case 1:
                return Grade.Lop1;
            case 2:
                return Grade.Lop2;
            case 3:
                return Grade.Lop3;
            case 4:
                return Grade.Lop4;
            case 5:
                return Grade.Lop5;
            case 6:
                return Grade.Lop6;
            case 7:
                return Grade.Lop7;
            case 8:
                return Grade.Lop8;
            case 9:
                return Grade.Lop9;
            case 10:
                return Grade.Lop10;
            case 11:
                return Grade.Lop11;
            case 12:
                return Grade.Lop12;
            case 13:
                return Grade.OnDaiHoc;
            case 14:
                return Grade.LopNangKhieu;
            case 15:
                return Grade.LopKhac;
            default:
                return null;
        }
    }
}
