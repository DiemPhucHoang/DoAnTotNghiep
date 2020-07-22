package com.example.trungtamgiasu.dao;

import com.example.trungtamgiasu.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface PasswordResetTokenDAO extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);

    @Modifying
    @Transactional
    @Query("delete from PasswordResetToken t where t.token = ?1")
    void deleteByToken(String token);

    @Modifying
    @Query("delete from PasswordResetToken t where t.expirationDate <= ?1")
    void deleteAllExpiredSince(Date now);
}
