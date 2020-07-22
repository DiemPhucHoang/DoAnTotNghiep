package com.example.trungtamgiasu.parsing;

import com.example.trungtamgiasu.model.User;
import com.example.trungtamgiasu.vo.User.UserInfoVO;

public interface UserParsing {
    User toUser(UserInfoVO userInfoVO);

    UserInfoVO toUserInfoVO(User user);
}
