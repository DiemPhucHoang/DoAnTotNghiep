package com.example.trungtamgiasu.service.impl;

import com.example.trungtamgiasu.dao.PasswordResetTokenDAO;
import com.example.trungtamgiasu.dao.RoleDAO;
import com.example.trungtamgiasu.dao.UserDAO;
import com.example.trungtamgiasu.exception.AppException;
import com.example.trungtamgiasu.exception.BadRequestException;
import com.example.trungtamgiasu.exception.ResourceNotFoundException;
import com.example.trungtamgiasu.model.PasswordResetToken;
import com.example.trungtamgiasu.model.Role;
import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.model.enums.RoleName;
import com.example.trungtamgiasu.parsing.UserParsing;
import com.example.trungtamgiasu.security.UserPrincipal;
import com.example.trungtamgiasu.service.UserService;
import com.example.trungtamgiasu.specification.UserSpecification;
import com.example.trungtamgiasu.vo.SearchUserVO;
import com.example.trungtamgiasu.vo.User.ChangePasswordVO;
import com.example.trungtamgiasu.vo.User.ForgotPasswordVO;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import com.example.trungtamgiasu.vo.User.UserVO;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Calendar;
import java.util.Collections;
import java.util.List;
import java.util.Objects;


@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private UserDAO userDAO;

    @Autowired
    protected UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserParsing userParsing;

    @Autowired
    private PasswordResetTokenDAO passwordResetTokenDAO;

    @Value("${file.upload-dir}")
    String path;

    @Autowired
    private RoleDAO roleDAO;

    @Override
    public User saveUser(User user) {
        logger.info("Save user with id: " + user.getId());
        return userDAO.save(user);
    }

    @Override
    public UserVO getById(Long idUser) {
        logger.info("Get user by id " + idUser);
        User user = userDAO.findById(idUser).orElseThrow(() ->
                new ResourceNotFoundException("User", "id" , idUser));
        UserVO userVO = new UserVO(user);
        return userVO;
    }

    @Override
    public UserInfoVO getByPhone(String phone) {
        logger.info("Get user by phone " + phone);

        User user =  userDAO.findByPhone(phone).orElseThrow(() ->
                new ResourceNotFoundException("User", "phone" , phone));

        UserInfoVO userInfoVO = new UserInfoVO(user);
        return userInfoVO;

    }

    @Override
    public User getUserByAuthentication(Authentication auth) {
        logger.info("Get user by authentication");
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
        return userDAO.findByPhone(userPrincipal.getPhone()).orElseThrow(() ->
                new ResourceNotFoundException("User", "phone" , userPrincipal.getPhone()));
    }

    @Override
    public void changePassword(ChangePasswordVO changePasswordVO, Authentication auth) {
        User user = getUserByAuthentication(auth);
        if(!(passwordEncoder.matches(changePasswordVO.getOldPassword(), user.getPassword()))) {
            throw new BadRequestException("Password does not match with the old password");
        }
        logger.info("Change password by idUser " + user.getId());
        userDAO.changePassword(passwordEncoder.encode(changePasswordVO.getNewPassword()), user.getId());
    }

    @Override
    public UserInfoVO changeInfoUser(Long idUser, UserInfoVO userInfoVO, Authentication auth) {
        User user = getUserByAuthentication(auth);
        if(!(idUser.equals(user.getId()))) {
            throw new ResourceNotFoundException("User", "id", idUser);
        }
        if (userDAO.existsByPhone(userInfoVO.getPhone())
                && !userInfoVO.getPhone().equals(user.getPhone())) {
            throw  new BadRequestException("Phone already exists");
        }
        user.setName(userInfoVO.getName());
        user.setPhone(userInfoVO.getPhone());
        user.setAddress(userInfoVO.getAddress());
        user.setEmail(userInfoVO.getEmail());
        logger.info("Update user by idUser" + user.getId());
        return userParsing.toUserInfoVO(saveUser(user));
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {
        logger.info("Create password  reset token for user");

        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenDAO.save(myToken);
    }

    @Override
    public User getByEmail(String email) {
        logger.info("Get user by email: " + email);
        return userDAO.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User", "email", email));
    }

    @Override
    public User savePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        return userDAO.save(user);
    }

    @Override
    public void changePasswordForgot(ForgotPasswordVO passwordVO) {
        logger.info("Change password forgot");
        PasswordResetToken passwordResetToken = passwordResetTokenDAO.findByToken(passwordVO.getToken());
        if (passwordVO.getToken() == null) {
            throw new ResourceNotFoundException("PasswordResetToken", "token", passwordResetToken.getToken());
        }
        //check expiration date
        Calendar cal = Calendar.getInstance();
        if ((passwordResetToken.getExpirationDate()
                .getTime() - cal.getTime()
                .getTime()) <= 0) {
            throw new BadRequestException("Expiration token. Can not change password forgot");
        }
        User user = userDAO.findById(passwordResetToken.getUser().getId()).orElseThrow(() ->
                new BadRequestException("Can't found user"));
        userService.savePassword(user, passwordVO.getPassword());
        passwordResetTokenDAO.deleteByToken(passwordVO.getToken());
    }

    @Override
    public boolean checkFileNameExist(String fileName, Long idUser) {
        List<User> users = userDAO.findAll();
        for (User item: users) {
            if(item.getImage() == null) {
               continue;
            }
            if(fileName.equals(item.getImage()) && !(item.getId().equals(idUser)))
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
        if(getById(idUser).getImage() != null) {
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
//        String fileName = file.getOriginalFilename();
        String oldFileName =  file.getOriginalFilename();
        if(oldFileName == null) {
            throw new BadRequestException("Can not found file name");
        }
        String newFileName = changeFileNameIfExist(file, idUser);
        try {
            if(newFileName.contains("..")){
                throw new BadRequestException("Sorry! Filename contains invalid path sequence " + newFileName);
            }
            Path dir = Paths.get(path).toAbsolutePath().normalize();
            try {
                Files.createDirectories(dir);
            } catch (Exception ex) {
                throw new BadRequestException("Could not create the directory where the uploaded files will be stored.");
            }
            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = dir.resolve(newFileName);
            InputStream is = file.getInputStream();
            Files.copy(is, targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BadRequestException("Could not store file " + newFileName + ". Please try again!");
        }
        user.setImage(newFileName);
        saveUser(user);
        return newFileName;
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
        String oldFileName =  user.getImage();
        String newFileName = changeFileNameIfExist(file, idUser);
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
        user.setImage(newFileName);
        saveUser(user);
        return newFileName;
    }

    @Override
    public List<User> findAllByRole(RoleName roleName) {
        Role role = roleDAO.findByName(roleName).get();
        return userDAO.findAllByRoles(role);
    }

    @Override
    public User addUser(UserVO userVO) {
        User user = userParsing.parseUserVOToEntity(userVO);
        Role userRole = roleDAO.findByName(RoleName.from(userVO.getRole()))
                .orElseThrow(() -> new AppException("User Role not set"));
        user.setRoles(Collections.singleton(userRole));
        return userDAO.save(user);
    }

    @Override
    public Page<UserVO> findAll(Pageable pageable) {
        List<User> users = userDAO.findAll();
        List<UserVO> userVOS = userParsing.toUserVOList(users);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), userVOS.size());
        Page<UserVO> userVOPage = new PageImpl<>
                (userVOS.subList(start, end), pageable, userVOS.size());
        return userVOPage;
    }

    @Override
    public void updateUser(UserVO userVO) throws Exception {
        User userDB = userDAO.findById(userVO.getId()).orElse(null);
        if (userDB == null) {
            throw new Exception("User not found");
        }
        try {
            userDB.setName(userVO.getName());
            userDB.setPhone(userVO.getPhone());
            userDB.setAddress(userVO.getAddress());
            userDB.setEmail(userVO.getEmail());
            saveUser(userDB);
        } catch (Exception e) {
            throw new Exception("Update user fail");
        }

    }

    @Override
    public Page<UserVO> searchUsers(SearchUserVO searchUserVO, Pageable pageable) {
        if(searchUserVO == null) {
            throw new BadRequestException("searchUserVO is not found");
        }

//        Set<Role> roles = new HashSet<>();
//        Role role = roleDAO.findByName(RoleName.valueOf(searchUserVO.getRole())).orElse(null);
//        roles.add(role);

        List<User> userList = userDAO.findAll(Objects.requireNonNull
                (Specification.
                        where(UserSpecification.withName(searchUserVO.getName()))
                        .and(UserSpecification.withPhone(searchUserVO.getPhone())))
                );

        List<UserVO> userVOS = userParsing.toUserVOList(userList);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), userVOS.size());
        Page<UserVO> userVOPage = new PageImpl<>
                (userVOS.subList(start, end), pageable, userVOS.size());
        return userVOPage;
    }

}
