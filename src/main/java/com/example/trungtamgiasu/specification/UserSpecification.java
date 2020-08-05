package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.model.User;
import org.springframework.data.jpa.domain.Specification;

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


