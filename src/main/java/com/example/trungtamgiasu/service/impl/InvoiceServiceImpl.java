package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.InvoiceDAO;
import com.example.trungtamgiasu.model.Invoice;
import com.example.trungtamgiasu.parsing.InvoiceParsing;
import com.example.trungtamgiasu.service.InvoiceService;
import com.example.trungtamgiasu.vo.TutorRegisterClass.ClassTutorVO;
import com.example.trungtamgiasu.vo.invoice.InvoiceInfoVo;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceParsing invoiceParsing;

    @Autowired
    private InvoiceDAO invoiceDAO;

    @Override
    public Invoice save(InvoiceVO invoiceVO) throws Exception {
        try {
            Invoice invoice = invoiceParsing.toInvoice(invoiceVO);
            return invoiceDAO.save(invoice);
        } catch (Exception e) {
            throw new Exception("Save invoice fail, " + e);
        }
    }

    public double[] calServiceFee(){
        double[] A = new double[12];
        List<Invoice> invoices = invoiceDAO.findAll();
        for (Invoice invoice: invoices) {
            int time = invoice.getTime().getMonth();
            switch (time){
                case 0:
                    A[0] += invoice.getServiceFee();
                    break;
                case 1:
                    A[1] += invoice.getServiceFee();
                    break;
                case 2:
                    A[2] += invoice.getServiceFee();
                    break;
                case 3:
                    A[3] += invoice.getServiceFee();
                    break;
                case 4:
                    A[4] += invoice.getServiceFee();
                    break;
                case 5:
                    A[5] += invoice.getServiceFee();
                    break;
                case 6:
                    A[6] += invoice.getServiceFee();
                    break;
                case 7:
                    A[7] += invoice.getServiceFee();
                    break;
                case 8:
                    A[8] += invoice.getServiceFee();
                    break;
                case 9:
                    A[9] += invoice.getServiceFee();
                    break;
                case 10:
                    A[10] += invoice.getServiceFee();
                    break;
                case 11:
                    A[11] += invoice.getServiceFee();
                    break;
            }
        }
        return A;
    }

    @Override
    public Page<InvoiceInfoVo> getAllInvoiceInfoVO(Pageable pageable) {
        List<Invoice> invoices = invoiceDAO.findAll();

        List<InvoiceInfoVo> invoiceInfoVos = new ArrayList<>();
        for(Invoice invoice: invoices) {
            invoiceInfoVos.add(new InvoiceInfoVo(invoice));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), invoiceInfoVos.size());
        Page<InvoiceInfoVo> invoiceInfoVoPage = new PageImpl<>
                (invoiceInfoVos.subList(start, end), pageable, invoiceInfoVos.size());
        return invoiceInfoVoPage;
    }
}
