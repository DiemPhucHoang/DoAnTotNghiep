package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.Invoice;
import com.example.trungtamgiasu.vo.invoice.InvoiceVO;

public interface InvoiceParsing {
    Invoice toInvoice(InvoiceVO invoiceVO) throws Exception;
}
