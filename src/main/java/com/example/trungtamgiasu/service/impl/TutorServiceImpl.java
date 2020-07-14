package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.*;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.mapper.FreeTimeMapper;
import com.example.trungtamgiasu.model.*;
import com.example.trungtamgiasu.model.enums.TutorStatus;
import com.example.trungtamgiasu.parsing.TutorParsing;
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
    private TutorParsing tutorParsing;

    @Autowired
    private FreeTimeMapper freeTimeMapper;

    @Value("${file.upload-dir}")
    String path;

    @Override
    public Page<TutorInfoVO> getAllByPage(Pageable pageable) {
        List<Tutor> tutors = tutorDAO.findByStatus(TutorStatus.CHUANHANLOP);
        List<TutorInfoVO> tutorInfoVOS = tutorParsing.toTutorsInfoVOList(tutors);

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
        List<Tutor> tutors = tutorDAO.findByStatus(TutorStatus.CHUANHANLOP);

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

        if(getTutorByIdUser(idUser).getImage() != null) {
            boolean checkExist = checkFileNameExist(fileName, idUser);
            while (checkExist)
            {
                index++;
                checkExist = checkFileNameExist(String.format("%s (%d)%s", firstFileName, index, lastFileName), idUser);
                if (!checkExist) {
                    fileName = String.format("%s (%d)%s", firstFileName, index, lastFileName);
                }
            }
        }

        return fileName;
    }

    @Override
    public String uploadImage(MultipartFile file, Long idUser, Authentication auth) {
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        User user = userDAO.findByPhone(userPrincipal.getPhone()).orElseThrow(() ->
                new UsernameNotFoundException("User not found with phone: " + userPrincipal.getPhone()));
        if(!(idUser.equals(user.getId())))
        {
            throw new UsernameNotFoundException("Can not found user " + idUser);
        }

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

//        Tutor tutorByIdUser = user.getTutor();
//        if(tutorByIdUser == null) {
//            Tutor tutor = new Tutor();
//            tutor.setImage(fileName);
//            tutor.setUser(user);
//            saveTutor(tutor);
//        } else {
//            if(tutorByIdUser.getImage() == null) {
//                tutorByIdUser.setImage(fileName);
//                saveTutor(tutorByIdUser);
//            }
//        }
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
        tutorVO.setStatus(TutorStatus.CHUANHANLOP.getKey());
        Tutor tutorMap = tutorParsing.toTutor(tutorVO);
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
        if(tutorVO.getFreeTime() != null) {
            List<FreeTime> freeTimeList = freeTimeDAO.findAll();
            for (FreeTimeVO freeTimeVO : tutorVO.getFreeTime()) {
                FreeTime freeTimeCheck = freeTimeMapper.toFreeTime(freeTimeVO);
                int dem = 0;
                for (FreeTime freeTime : freeTimeList) {
                    if(checkExistFreeTime(freeTime, freeTimeCheck)) {
                        tutorMap.getFreeTimes().add(freeTime);
                        dem++;
                        break;
                    }
                }
                if(dem == 0) {
                    FreeTime freeTime = freeTimeDAO.save(freeTimeMapper.toFreeTime(freeTimeVO));
                    tutorMap.getFreeTimes().add(freeTime);
                }
            }
        }
        return saveTutor(tutorMap);
    }

    @Override
    public Page<TutorInfoVO> searchTutor(SearchVO searchVO, Pageable pageable) {
        logger.info("Search tutor");
        List<Tutor> tutors = tutorDAO.findAll(Objects.requireNonNull(Objects.requireNonNull(Objects.requireNonNull(Specification.
                where(TutorSpecification.withSubject(searchVO.getSubject(), TutorStatus.CHUANHANLOP))
                .and(TutorSpecification.withClassTeach(searchVO.getClassTeach(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withDistrict(searchVO.getDistrict(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withLevel(searchVO.getLevel(), TutorStatus.CHUANHANLOP)))
                .and(TutorSpecification.withGender(searchVO.getGender(), TutorStatus.CHUANHANLOP)));
        List<TutorInfoVO> tutorInfoVOS = tutorParsing.toTutorsInfoVOList(tutors);
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
        return tutorParsing.toTutorInfoVO(tutor);

    }

    @Override
    public List<Tutor> getSimilarTutors(Long idTutor) {
        logger.info("Get similar tutor with id tutor " + idTutor);
        Tutor tutor = tutorParsing.toTutorByTutorInfoVO(getTutorById(idTutor));
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
            if(oldFileName != null) {
                Path oldPath = Paths.get("uploads\\"+oldFileName);
                //delete old file
                Files.delete(oldPath);
            }
            //copy new file
            Files.copy(is, targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BadRequestException("Could not store file " + newFileName + ". Please try again!");
        }
        saveTutor(tutor);
        return newFileName;
    }

    @Override
    public List<TutorInfoVO> getTop4Tutors() {
        logger.info("Get top 4");
        return tutorParsing.toTutorsInfoVOList(tutorDAO.findTop4ByStatus(TutorStatus.CHUANHANLOP));
    }

    @Override
    public TutorInfoVO changeInfoTutor(TutorVO tutorVO, Long idTutor) {
        logger.info("Change info tutor with id " + idTutor);
        Tutor tutor = tutorDAO.findById(idTutor).orElseThrow(() ->
                new ResourceNotFoundException("Tutor", "id", idTutor));
        tutor.setCollege(tutorVO.getCollege());
        tutor.setMajor(tutorVO.getMajor());
        tutor.setGraduationYear(tutorVO.getGraduationYear());
        tutor.setLevel(tutorVO.getLevel());
        tutor.setGender(tutorVO.getGender());
        tutor.setYearOfBirth(tutorVO.getYearOfBirth());
        tutor.setSalaryPerHour(tutorVO.getSalaryPerHour());
        //update table tutor_subject
        if(tutorVO.getSubject() != null) {
            tutor.setSubjects(updateSubjects(tutorVO.getSubject()));
        }
        //update table tutor_class_teach
        if(tutorVO.getClassTeach() != null) {
            tutor.setClassTeaches(updateClassTeaches(tutorVO.getClassTeach()));
        }
        //update table tutor_district
        if(tutorVO.getDistrict() != null) {
            tutor.setDistricts(updateDistricts(tutorVO.getDistrict()));
        }
        //update table tutor_free_time
        if(tutorVO.getFreeTime() != null) {
            tutor.setFreeTimes(updateFreeTimes(tutorVO.getFreeTime()));
        }
        return tutorParsing.toTutorInfoVO(saveTutor(tutor));
    }

    @Override
    public boolean checkExistFreeTime(FreeTime freeTimeFirst, FreeTime freeTimeSecond) {
        return freeTimeFirst.getDayName().equals(freeTimeSecond.getDayName()) &&
                (freeTimeFirst.isMorning() == freeTimeSecond.isMorning()) &&
                (freeTimeFirst.isAfternoon() == freeTimeSecond.isAfternoon()) &&
                (freeTimeFirst.isEvening() == freeTimeSecond.isEvening());
    }

    @Override
    public Set<Subject> updateSubjects(Long[] subjects) {
        Set<Subject> subjectSet = new HashSet<>();
        for (Long idSubject : subjects) {
            subjectSet.add(subjectDAO.findById(idSubject)
                    .orElseThrow(() -> new BadRequestException("Subject " + idSubject + " does not exists")));
        }
        return subjectSet;
    }

    @Override
    public Set<District> updateDistricts(Long[] districts) {
        Set<District> districtSet = new HashSet<>();
        for (Long idDistrict : districts) {
            districtSet.add(districtDAO.findById(idDistrict).
                    orElseThrow(() -> new BadRequestException("District " + idDistrict + "does not exists")));
        }
        return districtSet;
    }

    @Override
    public Set<ClassTeach> updateClassTeaches(Long[] classTeaches) {
        Set<ClassTeach> classTeachSet = new HashSet<>();
        for (Long idClassTeach : classTeaches) {
            classTeachSet.add(classTeachDAO.findById(idClassTeach).
                    orElseThrow(() -> new BadRequestException("Class teach " + idClassTeach + "does not exists")));
        }
        return classTeachSet;
    }

    @Override
    public Set<FreeTime> updateFreeTimes(FreeTimeVO[] freeTimeVOS) {
        Set<FreeTime> freeTimeSet = new HashSet<>();
        List<FreeTime> freeTimeList = freeTimeDAO.findAll();
        for (FreeTimeVO freeTimeVO : freeTimeVOS) {
            FreeTime freeTimeCheck = freeTimeMapper.toFreeTime(freeTimeVO);
            int dem = 0;
            for (FreeTime freeTime : freeTimeList) {
                if(checkExistFreeTime(freeTime, freeTimeCheck)) {
                    freeTimeSet.add(freeTime);
                    dem++;
                    break;
                }
            }
            if(dem == 0) {
                FreeTime freeTime = freeTimeDAO.save(freeTimeMapper.toFreeTime(freeTimeVO));
                freeTimeSet.add(freeTime);
            }
        }
        return freeTimeSet;
    }
}
