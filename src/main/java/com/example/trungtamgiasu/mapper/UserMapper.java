package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.UserInfoVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserInfoVO userInfoVO);

    UserInfoVO toUserInfoVO(User user);
}
