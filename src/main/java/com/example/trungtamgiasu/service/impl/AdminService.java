package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.ClassesDAO;
import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.model.Classes;
import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.RoleName;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.vo.CountTotalVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserService userService;

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private ClassesDAO classesDAO;

    public CountTotalVO countTotal(){
        CountTotalVO countTotalDto = new CountTotalVO();
        List<Classes> classes = classesDAO.findAll();
        countTotalDto.setTotalClass(classes.size());

        List<Tutor> tutors = tutorDAO.findAll();
        countTotalDto.setTotalTutor(tutors.size());

        List<User> parents = userService.findAllByRole(RoleName.ROLE_PARENT);
        countTotalDto.setTotalParent(parents.size());

        List<User> admins = userService.findAllByRole(RoleName.ROLE_ADMIN);
        countTotalDto.setTotalAdmin(admins.size());

        return countTotalDto;
    }

    public int[] calPercentOfNumber(){
        int A[] = new int[4];
        List<Classes> classes = classesDAO.findAll();
        for (Classes classs: classes) {
            switch (classs.getStatus()){
                case LOPMOI:
                    A[0] += 1;
                    break;
                case LOPDAGIAO:
                    A[1] += 1;
                    break;
                case CHOXACNHAN:
                    A[2] += 1;
                    break;
                case LOPBIHUY:
                    A[3] += 1;
                    break;
            }
        }
        return A;
    }

    public UserInfoVO getUserByClass(Long idClass) {
        Classes classes = classesDAO.findById(idClass).get();
        UserInfoVO userInfoVO = new UserInfoVO(classes.getUser());
        return userInfoVO;
    }
}
