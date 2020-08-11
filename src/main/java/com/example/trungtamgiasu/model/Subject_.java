package com.example.trungtamgiasu.model;


import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.model.Tutor;

import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Subject.class)
public class Subject_ {
    public static volatile SingularAttribute<Subject, String> subjectName;
}
