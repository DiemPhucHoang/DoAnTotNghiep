package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class TutorSpecification {

    public static Specification<Tutor> withSubject(String subject, TutorStatus tutorStatus) {
//        if (subject == null || subject.isEmpty()) {
//            return null;
//        } else {
//            // Specification using Java 8 lambdas
//            List<String> list = new ArrayList<>(Arrays.asList(subject.split(",")));
//            return (root, query, cb) -> {
//                Join join = root.join("subjects");
//                query.distinct(true);
//                Root<Subject> subjectRoot = query.from(Subject.class);
//                Expression<Collection<Tutor>> tutorSubject = subjectRoot.get("tutors");
//                return cb.and(cb.equal(subjectRoot.get("subjectName"), subjectRoot), cb.isMember(root, tutorSubject),
//                        cb.equal(root.get("status"), tutorStatus));
//            };
//        }
        if (subject == null || subject.isEmpty()) {
            return null;
        }
        List<String> list = new ArrayList<>(Arrays.asList(subject.split(",")));
        return new Specification<Tutor>() {
            @Override
            public Predicate toPredicate(Root<Tutor> root, CriteriaQuery<?> query,
                                         CriteriaBuilder cb) {
                final Collection<Predicate> predicates = new ArrayList<>();
                query.distinct(true);
                    if (!list.isEmpty()) {
                        final Predicate appPredicate = root.join(Tutor_.subjects).get(Subject_.subjectName).in(list);
                        predicates.add(appPredicate);
                    }
                return cb.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };

    }

    public static Specification<Tutor> withClassTeach(String classTeach, TutorStatus tutorStatus) {
        if (classTeach == null || classTeach.isEmpty()) {
            return null;
        } else {
            // Specification using Java 8 lambdas
            return (root, query, cb) -> {
                query.distinct(true);
                Root<ClassTeach> classTeachRoot = query.from(ClassTeach.class);
                Expression<Collection<Tutor>> tutorClassTeach = classTeachRoot.get("tutors");
                return cb.and(cb.equal(classTeachRoot.get("classTeachName"), classTeach), cb.isMember(root, tutorClassTeach),
                        cb.equal(root.get("status"), tutorStatus));
            };
        }
    }

    public static Specification<Tutor> withDistrict(String district, TutorStatus tutorStatus) {
        if (district == null || district.isEmpty()) {
            return null;
        } else {
            // Specification using Java 8 lambdas
            return (root, query, cb) -> {
                query.distinct(true);
                Root<District> districtRoot = query.from(District.class);
                Expression<Collection<Tutor>> tutorClassTeach = districtRoot.get("tutors");
                return cb.and(cb.equal(districtRoot.get("districtName"), district), cb.isMember(root, tutorClassTeach),
                        cb.equal(root.get("status"), tutorStatus));
            };
        }
    }

    public static Specification<Tutor> withLevel(String level, TutorStatus tutorStatus) {
        if (level == null || level.isEmpty()) {
            return null;
        } else {
            // Specification using Java 8 lambdas
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), tutorStatus),
                    cb.equal(root.get("level"), level)
            );
        }
    }

    public static Specification<Tutor> withGender(String gender, TutorStatus tutorStatus) {
        if (gender == null || gender.isEmpty()) {
            return null;
        } else {
            // Specification using Java 8 lambdas
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), tutorStatus),
                    cb.equal(root.get("gender"), gender)
            );
        }
    }

}
