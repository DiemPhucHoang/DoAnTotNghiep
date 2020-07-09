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
                if(isTutor) {
                    history.push("/ho-so-gia-su");
                } else {
                    history.push("/");
                }
                notification.success({
                    message: "Success",
                    description: "Đăng nhập thành công!"
                });

                callApi("auth", "GET", null).then(res => {
                    if (res.status === 200 && res.data.success) {
                        localStorage.setItem("id", res.data.result.id);
                        dispatch(setCurrentUser(res.data));
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

  