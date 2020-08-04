package com.example.trungtamgiasu.vo.invoice;

import com.example.trungtamgiasu.model.TutorRegisterClass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceVO {
    private Long id;

    private double serviceFee;

    private Date time;

    private Long idTutorRegisterClass;
}
