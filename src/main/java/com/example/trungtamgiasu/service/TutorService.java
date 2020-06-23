package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.TutorException;
import com.example.trungtamgiasu.exception.UserException;
import com.example.trungtamgiasu.model.enums.Role;
import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.parsing.TutorParsing;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.TutorSpecification;
import com.example.trungtamgiasu.vo.TutorVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class TutorService {

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private UserDAO userDAO;

    public void save(TutorVO tutorVO, Long userId) {
        User userDB = userDAO.findById(userId).get();
        if (userDB == null) {
            throw new UserException("User with ID " + userId + "not found");
        }

        if (userDB.getRole() != Role.ROLE_TUTOR) {
            throw new UserException("User with ID " + userId + "have not a Tutor Role");
        }

        try {
            Tutor tutor = TutorParsing.parseTutorVOToEntity(tutorVO);
            tutor.setUser(userDB);
            tutorDAO.save(tutor);
        } catch (Exception e) {
            throw new TutorException(e.getMessage());
        }
    }

    public List<TutorVO> getTutors() {
        List<Tutor> tutors =  tutorDAO.findAll();
        List<TutorVO> tutorVOS =  new ArrayList<>();
        for (Tutor tutor: tutors) {
            tutorVOS.add(new TutorVO(tutor));
        }
        return tutorVOS;
    }

    public List<TutorVO> searchTutor(SearchVO searchVO) {
        List<Tutor> tutors = tutorDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(Specification.
                where(TutorSpecification.withSubject(searchVO.getSubject(), TutorStatus.ACTIVE))
                .and(TutorSpecification.withGrade(searchVO.getGrade(), TutorStatus.ACTIVE)))
                .and(TutorSpecification.withDistrict(searchVO.getDistrict(), TutorStatus.ACTIVE)))
                .and(TutorSpecification.withLevel(searchVO.getLevel(), TutorStatus.ACTIVE)))
                .and(TutorSpecification.withGender(searchVO.getGender(), TutorStatus.ACTIVE)));
        List<TutorVO> tutorVOList = new ArrayList<>();
        for (Tutor tutor: tutors) {
            tutorVOList.add(new TutorVO(tutor));
        }
        return tutorVOList;
    }
}
