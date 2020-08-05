package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import com.example.trungtamgiasu.vo.User.UserVO;

import java.util.List;

public interface UserParsing {
    User toUser(UserInfoVO userInfoVO);

    UserInfoVO toUserInfoVO(User user);

    User parseUserVOToEntity(UserVO userVO);

    List<UserVO> toUserVOList(List<User> users);

}
