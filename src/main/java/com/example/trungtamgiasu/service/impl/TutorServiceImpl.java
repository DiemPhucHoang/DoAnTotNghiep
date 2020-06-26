package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.FreeTimeMapper;
import com.example.trungtamgiasu.mapper.TutorMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.TutorService;
import com.example.trungtamgiasu.specification.TutorSpecification;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.Tutor.TutorInfoVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class TutorServiceImpl implements TutorService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private DistrictDAO districtDAO;

    @Autowired
    private ClassTeachDAO classTeachDAO;

    @Autowired
    private FreeTimeDAO freeTimeDAO;

    @Autowired
    private SubjectDAO subjectDAO;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private TutorMapper tutorMapper;

    @Autowired
    private FreeTimeMapper freeTimeMapper;

    @Value("${file.upload-dir}")
    String path;

    @Override
    public Page<TutorInfoVO> getAllByPage(Pageable pageable) {
        List<Tutor> tutors = tutorDAO.findByStatus(TutorStatus.CHUA_NHAN_LOP);
        List<TutorInfoVO> tutorInfoVOS = tutorMapper.toTutorsInfoVOList(tutors);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorInfoVOS.size());
        Page<TutorInfoVO> tutorInfoVOPage = new PageImpl<>
                (tutorInfoVOS.subList(start, end), pageable, tutorInfoVOS.size());
        return tutorInfoVOPage;
    }

    @Override
    public Tutor saveTutor(Tutor tutor) {
        logger.info("Save tutor");
        return tutorDAO.save(tutor);
    }

    @Override
    public boolean checkFileNameExist(String fileName, Long idUser) {
        List<Tutor> tutors = tutorDAO.findByStatus(TutorStatus.CHUA_NHAN_LOP);

        for (Tutor item: tutors) {
            if(item.getImage().equals(fileName) && !(item.getUser().getId().equals(idUser)))
            {
                return true;
            }
        }
        return false;
    }

    @Override
    public String changeFileNameIfExist(MultipartFile file, Long idUser) {
        int index = 1;
        String fileName = file.getOriginalFilename();
        if(fileName == null) {
            throw new BadRequestException("File name does not exists");
        }
        String firstFileName = fileName.substring(0, fileName.lastIndexOf("."));
        String lastFileName = fileName.substring(fileName.lastIndexOf("."));
        boolean checkExist = checkFileNameExist(fileName, idUser);
        while (checkExist)
        {
            index++;
            checkExist = checkFileNameExist(String.format("%s (%d)%s", firstFileName, index, lastFileName), idUser);
            if (!checkExist) {
                fileName = String.format("%s (%d)%s", firstFileName, index, lastFileName);
            }
        }
        return fileName;
    }

    @Override
    public String uploadImage(MultipartFile file) {
        if(file.isEmpty())
        {
            throw new BadRequestException("Failed to store empty file");
        }
        String fileName = file.getOriginalFilename();
        if(fileName == null) {
            throw new BadRequestException("Can not found file name");
        }
        try {
            if(fileName.contains("..")){
                throw new BadRequestException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path dir = Paths.get(path).toAbsolutePath().normalize();
            try {
                Files.createDirectories(dir);
            } catch (Exception ex) {
                throw new BadRequestException("Could not create the directory where the uploaded files will be stored.");
            }
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = dir.resolve(fileName);
            InputStream is = file.getInputStream();
            Files.copy(is, targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BadRequestException("Could not store file " + fileName + ". Please try again!");
        }
        return fileName;
    }

    @Override
    public Tutor createTutor(TutorVO tutorVO, Long idUser) {
        logger.info("Create tutor service");
        if(tutorVO == null) {
            throw new BadRequestException("Tutor is null");
        }
        User user = userDAO.findById(idUser).orElseThrow(() ->
                new ResourceNotFoundException("User", "id" , idUser));
        if(tutorDAO.existsByUser(user)) {
            throw new BadRequestException("Id user already exists");
        }
        TutorStatus tutorStatus = TutorStatus.CHUA_NHAN_LOP;
        tutorVO.setStatus(tutorStatus);
        Tutor tutorMap = tutorMapper.toTutor(tutorVO);
        tutorMap.setUser(userDAO.findById(idUser).
                orElseThrow(() -> new ResourceNotFoundException("User", "id", idUser)));
        //add table tutor_subject
        if(tutorVO.getSubject() != null) {
            for (Long idSubject : tutorVO.getSubject()) {
                tutorMap.getSubjects().add(subjectDAO.findById(idSubject)
                        .orElseThrow(() -> new BadRequestException("Subject " + idSubject + " does not exists")));
            }
        }
        //add table tutor_class_teach
        if(tutorVO.getClassTeach() != null) {
            for (Long idClassTeach : tutorVO.getClassTeach()) {
                tutorMap.getClassTeaches().add(classTeachDAO.findById(idClassTeach).
                        orElseThrow(() -> new BadRequestException("Class teach " + idClassTeach + "does not exists")));
            }
        }
        //add table tutor_district
        if(tutorVO.getDistrict() != null) {
            for (Long idDistrict : tutorVO.getDistrict()) {
                tutorMap.getDistricts().add(districtDAO.findById(idDistrict).
                        orElseThrow(() -> new BadRequestException("District " + idDistrict + "does not exists")));
            }
        }
        //add table tutor_free_time
        for (FreeTimeVO freeTimeVO : tutorVO.getFreeTime()) {
            FreeTime freeTime = freeTimeDAO.save(freeTimeMapper.toFreeTime(freeTimeVO));
            tutorMap.getFreeTimes().add(freeTimeDAO.findById(freeTime.getId()).
                    orElseThrow(() -> new BadRequestException("Free time by id " + freeTime.getId() + "does not exists")));
        }
        return saveTutor(tutorMap);
    }

    @Override
    public Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable) {
        logger.info("Search tutor");
        List<Tutor> tutors = tutorDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(Specification.
                where(TutorSpecification.withSubject(searchVO.getSubject(), TutorStatus.CHUA_NHAN_LOP))
                .and(TutorSpecification.withClassTeach(searchVO.getClassTeach(), TutorStatus.CHUA_NHAN_LOP)))
                .and(TutorSpecification.withDistrict(searchVO.getDistrict(), TutorStatus.CHUA_NHAN_LOP)))
                .and(TutorSpecification.withLevel(searchVO.getLevel(), TutorStatus.CHUA_NHAN_LOP)))
                .and(TutorSpecification.withGender(searchVO.getGender(), TutorStatus.CHUA_NHAN_LOP)));
        List<TutorInfoVO> tutorInfoVOS = tutorMapper.toTutorsInfoVOList(tutors);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), tutorInfoVOS.size());
        Page<TutorInfoVO> tutorInfoVOPage = new PageImpl<>
                (tutorInfoVOS.subList(start, end), pageable, tutorInfoVOS.size());
        return tutorInfoVOPage;
    }

    @Override
    public TutorInfoVO getTutorById(Long id) {
        logger.info("Get tutor by id " + id);
        Tutor tutor = tutorDAO.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Tutor", "id", id));
        return tutorMapper.toTutorInfoVO(tutor);

    }

    @Override
    public List<Tutor> getSimilarTutors(Long idTutor) {
        logger.info("Get similar tutor with id tutor " + idTutor);
        Tutor tutor = tutorMapper.toTutorByTutorInfoVO(getTutorById(idTutor));
        List<Tutor> tutors = new ArrayList<>();
        for (Subject subject : tutor.getSubjects()) {
            tutors.addAll(tutorDAO.findBySubjects_SubjectName(subject.getSubjectName()));
        }

        Set<Tutor> tutorSet = new LinkedHashSet<>(tutors);
        List<Tutor> tutorArrayList =  new ArrayList<>(tutorSet);
        tutorArrayList.remove(tutor);
        return tutorArrayList;
    }

    @Override
    public Tutor getTutorByIdUser(Long idUser) {
        logger.info("Get tutor by id " + idUser);
        return tutorDAO.findByUser(userDAO.findById(idUser).
                orElseThrow(() -> new ResourceNotFoundException("User", "id ", idUser))).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "id",idUser));
    }

    @Override
    public String changeImage(Long idUser, MultipartFile file, Authentication auth) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        User user = userDAO.findByPhone(userPrincipal.getPhone()).orElseThrow(() ->
                new UsernameNotFoundException("User not found with phone: " + userPrincipal.getPhone()));
        if(!(idUser.equals(user.getId())))
        {
            throw new UsernameNotFoundException("Can not found user");
        }
        Tutor tutor = getTutorByIdUser(idUser);
        String oldFileName =  tutor.getImage();
        String newFileName = changeFileNameIfExist(file, idUser);
        tutor.setImage(newFileName);

        if(file.isEmpty())
        {
            throw new BadRequestException("Failed to store empty file");
        }
        try {
            if(newFileName.contains("..")){
                throw new BadRequestException("Sorry! Filename contains invalid path sequence " + newFileName);
            }
            Path dir = Paths.get(path).toAbsolutePath().normalize();
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = dir.resolve(newFileName);
            InputStream is = file.getInputStream();
            Path oldPath = Paths.get("uploads\\"+oldFileName);
            //delete old file
            Files.delete(oldPath);
            //copy new file
            Files.copy(is, targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BadRequestException("Could not store file " + newFileName + ". Please try again!");
        }
        saveTutor(tutor);
        return newFileName;
    }
}
