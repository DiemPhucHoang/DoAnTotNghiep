package com.example.trungtamgiasu.parsing.impl;

import com.example.trungtamgiasu.dao.TutorRegisterClassDAO;
import com.example.trungtamgiasu.model.Invoice;
import com.example.trungtamgiasu.model.TutorRegisterClass;
import com.example.trungtamgiasu.parsing.InvoiceParsing;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InvoiceParsingImpl implements InvoiceParsing {

    @Autowired
    private TutorRegisterClassDAO tutorRegisterClassDAO;

    @Override
    public Invoice toInvoice(InvoiceVO invoiceVO) throws Exception {
        if (invoiceVO == null) {
            return null;
        }
        TutorRegisterClass tutorRegisterClass = tutorRegisterClassDAO.findById(invoiceVO.getIdTutorRegisterClass()).orElse(null);
        if (tutorRegisterClass == null) {
            throw new Exception("tutorRegisterClass not valid");
        }
        return new Invoice(invoiceVO.getServiceFee(), invoiceVO.getTime(), tutorRegisterClass);
    }
}
