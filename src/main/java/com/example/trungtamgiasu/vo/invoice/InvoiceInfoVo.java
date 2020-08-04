package com.example.trungtamgiasu.vo.invoice;

import com.example.trungtamgiasu.model.Invoice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceInfoVo {
    private Long idInvoice;

    private double serviceFee;

    private Date time;

    private String classTeach;

    private String tutorName;

    public InvoiceInfoVo(Invoice invoice) {
        this.idInvoice = invoice.getId();
        this.serviceFee = invoice.getServiceFee();
        this.time = invoice.getTime();
        this.classTeach = invoice.getClassRegister().getClasses().getClassTeach();
        this.tutorName = invoice.getClassRegister().getTutor().getUser().getName();
    }
}
