package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import org.springframework.data.jpa.domain.Specification;

public class ClassesSpecification {

    public static Specification<Classes> withSubject(String subject, ClassesStatus classesStatus) {
        if (subject == "" || subject.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), classesStatus),
                    cb.like(root.get("subject"), "%"+subject+"%")
            );
        }
    }

    public static Specification<Classes> withClassTeach(String classTeach, ClassesStatus classesStatus) {
        if (classTeach == "" || classTeach.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), classesStatus),
                    cb.equal(root.get("classTeach"), classTeach)
            );
        }
    }

    public static Specification<Classes> withDistrict(String district, ClassesStatus classesStatus) {
        if (district == "" || district.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), classesStatus),
                    cb.equal(root.get("district"), district)
            );
        }
    }

    public static Specification<Classes> withLevel(String level, ClassesStatus classesStatus) {
        if (level == "" || level.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), classesStatus),
                    cb.equal(root.get("levelRequirement"), level)
            );
        }
    }

    public static Specification<Classes> withGender(String gender, ClassesStatus classesStatus) {
        if (gender == "" || gender.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), classesStatus),
                    cb.equal(root.get("genderRequirement"), gender)
            );
        }
    }

}
