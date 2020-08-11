package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.ClassesStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class ClassesSpecification {

    public static Specification<Classes> withSubject(String subject, ClassesStatus classesStatus) {
//        if (subject == "" || subject.isEmpty()) {
//            return null;
//        } else {
//            return (root, query, cb) -> cb.and(
//                    cb.equal(root.get("status"), classesStatus),
//                    cb.like(root.get("subject"), "%"+subject+"%")
//            );
//        }
        if (subject == null || subject.isEmpty()) {
            return null;
        }
        List<String> list = new ArrayList<>(Arrays.asList(subject.split(",")));
        return new Specification<Classes>() {
            @Override
            public Predicate toPredicate(Root<Classes> root, CriteriaQuery<?> query,
                                         CriteriaBuilder cb) {
                final Collection<Predicate> predicates = new ArrayList<>();
//                query.distinct(true);
//                if (!list.isEmpty()) {
//                    final Predicate appPredicate = root.get(Classes_.subject).in(list);
//                    predicates.add(appPredicate);
//                }
//                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                Join join = root.join("classes");
                return join.get("subject").in(list);
            }
        };
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

    //
    public static Specification<Classes> withSubject(String subject) {
        if (subject == "" || subject.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.like(root.get("subject"), "%"+subject+"%")
            );
        }
    }
    public static Specification<Classes> withClassTeach(String classTeach) {
        if (classTeach == "" || classTeach.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("classTeach"), classTeach)
            );
        }
    }

    public static Specification<Classes> withDistrict(String district) {
        if (district == "" || district.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("district"), district)
            );
        }
    }

    public static Specification<Classes> withLevel(String level) {
        if (level == "" || level.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("levelRequirement"), level)
            );
        }
    }

    public static Specification<Classes> withGender(String gender) {
        if (gender == "" || gender.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("genderRequirement"), gender)
            );
        }
    }

}
