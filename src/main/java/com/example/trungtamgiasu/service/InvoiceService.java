package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.Invoice;
import com.example.trungtamgiasu.vo.invoice.InvoiceInfoVo;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InvoiceService {
    Invoice save(InvoiceVO invoiceVO) throws Exception;

    double[] calServiceFee();

    Page<InvoiceInfoVo> getAllInvoiceInfoVO(Pageable pageable);
}
