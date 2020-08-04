import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";
import setAuthorizationToken from './../utils/setAuthorizationToken';

//logout
export const logoutRequest = (history) => {
    
    return dispatch => {
        // history.push("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
    };
  };

//login
export const actLoginRequest = (userInfo, history, isTutor) => {
    return dispatch => {
        return callApi("auth/login", "POST", userInfo).then(res => {
            if (res.status === 200) {
                const token = res.data.accessToken;
                localStorage.setItem("token", token);
                setAuthorizationToken(token);
                notification.success({
                    message: "Success",
                    description: "Đăng nhập thành công!"
                });

                callApi("auth", "GET", null).then(res => {
                    if (res.status === 200 && res.data.success) {
                        localStorage.setItem("id", res.data.result.id);
                        dispatch(setCurrentUser(res.data));

                        if (res.data.result.role === 'ROLE_ADMIN') {
                            history.push("/admin");
                        } else if (res.data.result.role === 'ROLE_TUTOR') {
                            if(isTutor) {
                                history.push("/ho-so-gia-su");
                            } else {
                                history.push("/");
                            }
                        } 
                    }
                }).catch(err => {
                    console.log(err);
                });
                
            }
        }).catch(err => {
            notification.error({
                message: "Failed",
                description: "Số điện thoại hoặc mật khẩu không đúng. Vui lòng thử lại!"
            });
        })
    };
};

export const setCurrentUser = user => {
    return {
        type: Types.SET_CURRENT_USER,
        user
    };
};

export const actGetParentClassRequest = (id) => {
    return dispatch => {
        return callApi(`admin/${id}/parent`, 'GET', null)
            .then(res => {
                dispatch(actGetParentClass(res.data));
            }).catch(err => {
                notification.error({
                    message: "Failed",
                    description: "Không lấy được thông tin phụ huynh"
                });
            });
    }
}
export const actGetParentClass = (parent) => {
    return {
        type: Types.GET_PARENT_CLASS,
        parent
    }
}

// get all users
export const actFetchUsersRequest = (page) => {
    return (dispatch) => {
        return callApi(`auth/all?page=${page}`, 'GET', null).then(res => {
            dispatch(actFetchUsers(res.data));
        });
    }
}

export const actFetchUsers = (users) => {
    return {
        type: Types.FETCH_USERS,
        users
    }
}

// add user
export const actAddUserRequest = (user, history) => {
    return dispatch => {
        return callApi('auth/addUser', 'POST', user).then(res => {
            dispatch(actAddUser(res.data.result));
            history.goBack();
            if (res.status === 200 && res.data.success) {               
                notification.success({
                    message: "Success",
                    description: "Thêm user thành công!"
                });
            }
            else{
                notification.error({
                    message: "Error",
                    description: "Thất bại!"
                });
            }
        })
    }
}
export const actAddUser = (user) =>{
    return {
        type: Types.ADD_USER,
        user
    }
}

// get user by ID
export const actGetUserRequest = (id) => {
    return dispatch => {
        return callApi(`auth/${id}`, 'GET', null)
            .then(res => {
                dispatch(actGetUser(res.data));
            });
    }
}
export const actGetUser = (users) => {
    return {
        type: Types.FETCH_USER,
        users
    }
}


// update user
export const actUpdateUserRequest = (user, history) => {
    return dispatch => {
        callApi('auth', 'PUT', user)
        .then(res => {
            dispatch(actUpdateUser(res.data.result));
            history.goBack();
            if (res.status === 200 && res.data.success) {               
                notification.success({
                    message: "Success",
                    description: "Update user thành công!"
                });
            }
            else{
                notification.error({
                    message: "Error",
                    description: "Thất bại"
                });
            }
        })
    }
}
export const actUpdateUser = (user) => {
    return {
        type: Types.UPDATE_USER,
        user
    }
}

//get input search
export const actSearchInputUserRequest = searchInput => {
    return {
        type: Types.SEARCH_INPUT_USER,
        searchInput
    }
}

//search classes
export const actSearchUserRequest = (searchInput, page) => {
    return dispatch => {
        return callApi(
            `auth/search?page=${page}`, "POST", searchInput).then(res => {
                if (res.status === 200 && res.data.success) {
                    dispatch(actSearchUsers(res.data));
                }
            }).catch(err => {
                console.log(err);
          });
    }
}
export const actSearchUsers = users => {
    return {
        type: Types.SEARCH_USER,
        users
    };
}

//change info user
export const actChangeInfoUserRequest = (userInfo) => {
    return dispatch => {
        return callApi(`auth/${localStorage.getItem("id")}`, "POST", userInfo).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actChangeInfoUser(res.data));
                notification.success({
                    message: "Success",
                    description: "Chỉnh sửa thông tin thành công!"
                });
            } else {
                notification.error({
                    message: "Failed",
                    description: "Chỉnh sửa thông tin thất bại. Vui lòng kiểm tra lại thông tin!"
                });
            }
        }).catch(err => {
            notification.error({
                message: "Failed",
                description: "Chỉnh sửa thông tin thất bại. Vui lòng kiểm tra lại thông tin!"
            });
        });
    }
}

export const actChangeInfoUser = user => {
    return {
        type: Types.CHANGE_INFO_USER,
        user
    }
}

export const actFetchUserRequest = () => {
    return dispatch => {
        return callApi(`auth/${localStorage.getItem("id")}`, "GET", null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actFetchUser(res.data));
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

export const actFetchUser = user => {
    return {
        type: Types.FETCH_USER_BY_ID,
        user
    }
}