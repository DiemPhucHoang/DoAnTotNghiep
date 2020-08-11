package com.example.trungtamgiasu.model;

import com.example.trungtamgiasu.model.Subject;
import com.example.trungtamgiasu.model.Tutor;

import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Tutor.class)
public class Tutor_ {
    public static volatile SetAttribute<Tutor, Subject> subjects;
}
