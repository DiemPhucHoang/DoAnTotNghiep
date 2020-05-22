package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.TutorDAO;
import com.example.trungtamgiasu.exception.TutorException;
import com.example.trungtamgiasu.mapper.FreeTimeMapper;
import com.example.trungtamgiasu.mapper.TutorMapper;
import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.model.Tutor;
import com.example.trungtamgiasu.model.TutorStatus;
import com.example.trungtamgiasu.service.*;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import com.example.trungtamgiasu.vo.Tutor.TutorVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class TutorServiceImpl implements TutorService {
    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private TutorDAO tutorDAO;

    @Autowired
    private UserService userService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ClassTeachService classTeachService;

    @Autowired
    private DistrictService districtService;

    @Autowired
    private FreeTimeService freeTimeService;

    @Autowired
    private TutorMapper tutorMapper;

    @Autowired
    private FreeTimeMapper freeTimeMapper;

    @Value("${file.upload-dir}")
    String path;


    @Override
    public List<Tutor> getAll() {
        logger.info("Get all tutors");
        return tutorDAO.findAll();
    }

    @Override
    public Tutor saveTutor(Tutor tutor) {
        logger.info("Save tutor");
        return tutorDAO.save(tutor);
    }

    @Override
    public boolean checkFileNameExist(String fileName, Long idUser) {
        List<Tutor> tutorsList = getAll();
        for (Tutor item: tutorsList) {
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
            throw new TutorException("Can not found file name");
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
            throw new TutorException("Failed to store empty file");
        }
        String fileName = file.getOriginalFilename();
        if(fileName == null) {
            throw new TutorException("Can not found file name");
        }
        try {
            if(fileName.contains("..")){
                throw new TutorException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path dir = Paths.get(path).toAbsolutePath().normalize();
            try {
                Files.createDirectories(dir);
            } catch (Exception ex) {
                throw new TutorException("Could not create the directory where the uploaded files will be stored.");
            }
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = dir.resolve(fileName);
            InputStream is = file.getInputStream();
            Files.copy(is, targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new TutorException("Could not store file " + fileName + ". Please try again!");
        }
        return fileName;
    }

    @Override
    public Tutor createTutor(TutorVO tutorVO, Long idUser) {
        logger.info("Create tutor service");
        if(tutorVO == null) {
            throw new TutorException("Tutor is null");
        }
        TutorStatus tutorStatus = TutorStatus.CHUA_NHAN_LOP;
        tutorVO.setStatus(tutorStatus);
        Tutor tutorMap = tutorMapper.toTutor(tutorVO);
        tutorMap.setUser(userService.getById(idUser));
        //add table tutor_subject
        for (Long idSubject : tutorVO.getSubject()) {
            tutorMap.getSubjects().add(subjectService.getById(idSubject));
        }
        //add table tutor_class_teach
        for (Long idClassTeach : tutorVO.getClassTeach()) {
            tutorMap.getClassTeaches().add(classTeachService.getById(idClassTeach));
        }
        //add table tutor_district
        for (Long idDistrict : tutorVO.getDistrict()) {
            tutorMap.getDistricts().add(districtService.getById(idDistrict));
        }
        //add table tutor_free_time
        for (FreeTimeVO freeTimeVO : tutorVO.getFreeTime()) {
            FreeTime freeTime = freeTimeService.saveFreeTime(freeTimeMapper.toFreeTime(freeTimeVO));
            tutorMap.getFreeTimes().add(freeTimeService.getByIdFreeTime(freeTime.getId()));
        }
        return saveTutor(tutorMap);
    }
}
