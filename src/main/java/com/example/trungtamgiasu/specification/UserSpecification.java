package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.RoleName;
import org.springframework.data.jpa.domain.Specification;

import java.util.HashSet;
import java.util.Set;

public class UserSpecification {

    public static Specification<User> withName(String name) {
        if (name == "" || name.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.like(root.get("name"), name)
            );
        }
    }

    public static Specification<User> withPhone(String phone) {
        if (phone == "" || phone.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("phone"), phone)
            );
        }
    }

//    public static Specification<User> withRole(Set<Role> roles) {
//
//        if (roles == null || roles.isEmpty()) {
//            return null;
//        } else {
//            return (root, query, cb) -> cb.and(
//                    cb.equal(root.get("roles"), roles)
//            );
//        }
//    }
}


