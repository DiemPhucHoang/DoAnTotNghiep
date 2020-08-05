package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDAO extends JpaRepository<Invoice, Long> {

}
