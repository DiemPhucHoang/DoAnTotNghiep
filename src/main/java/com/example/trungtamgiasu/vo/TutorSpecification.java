package com.example.trungtamgiasu.vo;

import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.enums.District;
import com.example.trungtamgiasu.model.enums.Grade;
import com.example.trungtamgiasu.model.enums.Subject;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import org.springframework.data.jpa.domain.Specification;


public class TutorSpecification {
    public static Specification<Tutor> withSubject(String subject, TutorStatus tutorStatus) {
        if (subject == null || subject.isEmpty()) {
            return null;
        } else {

            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), tutorStatus),
                    cb.isMember(Subject.from(subject), root.get("subjects"))
            );
        }
    }

    public static Specification<Tutor> withGrade(String grade, TutorStatus tutorStatus) {
        if (grade == null || grade.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), tutorStatus),
                    cb.isMember(Grade.from(grade), root.get("grades"))
            );
        }
    }

    public static Specification<Tutor> withDistrict(String district, TutorStatus tutorStatus) {
        if (district == null || district.isEmpty()) {
            return null;
        } else {
            return (root, query, cb) -> cb.and(
                    cb.equal(root.get("status"), tutorStatus),
                    cb.isMember(District.from(district), root.get("districts"))
            );
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
