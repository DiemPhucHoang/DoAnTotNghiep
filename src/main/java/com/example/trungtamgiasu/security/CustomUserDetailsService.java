package com.example.trungtamgiasu.security;

import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userDAO.findByPhone(phone).orElseThrow(() ->
                new UsernameNotFoundException("User not found with phone: " + phone));
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        User user = userDAO.findById(id).orElseThrow(() ->
                new UsernameNotFoundException("User not found with id: " + id));
        return UserPrincipal.create(user);
    }
}
