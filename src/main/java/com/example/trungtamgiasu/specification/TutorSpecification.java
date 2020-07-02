package com.example.trungtamgiasu.specification;

import com.example.trungtamgiasu.model.ClassTeach;
import com.example.trungtamgiasu.model.District;
import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.util.Collection;

public class TutorSpecification {

    public static Specification<Tutor> withSubject(String subject, TutorStatus tutorStatus) {
        if (subject == null || subject.isEmpty()) {
            return null;
        } else {
            // Specification using Java 8 lambdas
            return (root, query, cb) -> {
                query.distinct(true);
                Root<Subject> subjectRoot = query.from(Subject.class);
                Expression<Collection<Tutor>> tutorSubject = subjectRoot.get("tutors");
                return cb.and(cb.equal(subjectRoot.get("subjectName"), subject), cb.isMember(root, tutorSubject),
                        cb.equal(root.get("status"), tutorStatus));
            };
        }
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
