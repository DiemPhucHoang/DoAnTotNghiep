package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.InvoiceService;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/serviceFee")
    public ApiResponse getServiceFee(){
        return new ApiResponse(
                true,
                "get service fee",
                invoiceService.calServiceFee()
        );
    }

    @GetMapping("/all")
    public ApiResponse getAllInvoice(@PageableDefault(size = 6)Pageable pageable){
        return new ApiResponse(
                true,
                "get service fee",
                invoiceService.getAllInvoiceInfoVO(pageable)
        );
    }
}
