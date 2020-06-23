package com.example.trungtamgiasu.model.enums;

import lombok.Getter;

@Getter
public enum District {
    Q1("Quận 1", 1),
    Q2("Quận 2", 2),
    Q3("Quận 3", 3),
    Q4("Quận 4", 4),
    Q5("Quận 5", 5),
    Q6("Quận 6", 6),
    Q7("Quận 7", 7),
    Q8("Quận 8", 8),
    Q9("Quận 9", 9),
    Q10("Quận 10", 10),
    Q11("Quận 11", 11),
    Q12("Quận 12", 12),
    QThuDuc("Quận Thủ Đức", 13),
    QBinhThanh("Quận Bình Thạnh", 14),
    QTanBinh("Quận Tân Bình", 15),
    QTanPhu("Quận Tân Phú", 16),
    QGoVap("Quận Gò Vấp", 17);

    private final String key;
    private final Integer value;

    District(String key, Integer value) {
        this.key = key;
        this.value = value;
    }

    public static District from(String key) {
        switch (key) {
            case "Quận 1":
                return District.Q1;
            case "Quận 2":
                return District.Q2;
            case "Quận 3":
                return District.Q3;
            case "Quận 4":
                return District.Q4;
            case "Quận 5":
                return District.Q5;
            case "Quận 6":
                return District.Q6;
            case "Quận 7":
                return District.Q7;
            case "Quận 8":
                return District.Q8;
            case "Quận 9":
                return District.Q9;
            case "Quận 10":
                return District.Q10;
            case "Quận 11":
                return District.Q11;
            case "Quận 12":
                return District.Q12;
            case "Quận Thủ Đức":
                return District.QThuDuc;
            case "Quận Bình Thạnh":
                return District.QBinhThanh;
            case "Quận Tân Bình":
                return District.QTanBinh;
            case "Quận Tân Phú":
                return District.QTanPhu;
            case "Quận Gò Vấp":
                return District.QGoVap;
            default:
                 return null;
        }
    }

    public static District from(Integer value) {
        switch (value) {
            case 1:
                return District.Q1;
            case 2:
                return District.Q2;
            case 3:
                return District.Q3;
            case 4:
                return District.Q4;
            case 5:
                return District.Q5;
            case 6:
                return District.Q6;
            case 7:
                return District.Q7;
            case 8:
                return District.Q8;
            case 9:
                return District.Q9;
            case 10:
                return District.Q10;
            case 11:
                return District.Q11;
            case 12:
                return District.Q12;
            case 13:
                return District.QThuDuc;
            case 14:
                return District.QBinhThanh;
            case 15:
                return District.QTanBinh;
            case 16:
                return District.QTanPhu;
            case 17:
                return District.QGoVap;
            default:
                return null;
        }
    }
}
