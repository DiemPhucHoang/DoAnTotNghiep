package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum Subject {

    Toan("Toán", 0),
    VatLy("Vật lý", 1),
    HoaHoc("Hóa học", 2),
    NguVan("Ngữ văn", 3),
    TiengAnh("Tiếng Anh", 4),
    SinhHoc("Sinh học", 5),
    BaoBai("Báo bài", 6),
    LichSu("Lịch sử", 7),
    TiengViet("Tiếng Việt", 8),
    DiaLy("Địa lý", 9),
    Ve("Vẽ", 10),
    DanNhac("Đàn nhạc", 11),
    TinHoc("Tin học", 12);

    private final String key;
    private final Integer value;

    Subject(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static Subject from(String key) {
        switch (key) {
            case "Toán":
                return Subject.Toan;
            case "Vật lý":
                return Subject.VatLy;
            case "Hóa học":
                return Subject.HoaHoc;
            case "Ngữ văn":
                return Subject.NguVan;
            case "Tiếng Anh":
                return Subject.TiengAnh;
            case "Sinh học":
                return Subject.SinhHoc;
            case "Báo bài":
                return Subject.BaoBai;
            case "Lịch sử":
                return Subject.LichSu;
            case "Tiếng Việt":
                return Subject.TiengViet;
            case "Địa lý":
                return Subject.DiaLy;
            case "Vẽ":
                return Subject.Ve;
            case "Đàn nhạc":
                return Subject.DanNhac;
            case "Tin học":
                return Subject.TinHoc;
            default:
                return null;
        }
    }

    public Subject from(Integer value) {
        switch (value) {
            case 0:
                return Subject.Toan;
            case 1:
                return Subject.VatLy;
            case 2:
                return Subject.HoaHoc;
            case 3:
                return Subject.NguVan;
            case 4:
                return Subject.TiengAnh;
            case 5:
                return Subject.SinhHoc;
            case 6:
                return Subject.BaoBai;
            case 7:
                return Subject.LichSu;
            case 8:
                return Subject.TiengViet;
            case 9:
                return Subject.DiaLy;
            case 10:
                return Subject.Ve;
            case 11:
                return Subject.DanNhac;
            case 12:
                return Subject.TinHoc;
            default:
                return null;
        }
    }
}
