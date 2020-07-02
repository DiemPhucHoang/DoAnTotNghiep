import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";
import setAuthorizationToken from './../utils/setAuthorizationToken';

//login
export const actLoginRequest = (userInfo, history) => {
    return dispatch => {
        return callApi("auth/login", "POST", userInfo).then(res => {
            if (res.status === 200) {
                const token = res.data.accessToken;
                localStorage.setItem("token", token);
                setAuthorizationToken(token);
                // dispatch(setCurrentUser(userInfo.phone));
                history.push("/");
                notification.success({
                    message: "Success",
                    description: "Đăng nhập thành công!"
                });
                
                callApi("auth", "GET", null).then(res => {
                    if (res.status === 200 && res.data.success) {
                        localStorage.setItem("id", res.data.result.id);
                        dispatch(setCurrentUser(res.data));
                    }
                }).catch(error => {
                    console.log('error: ', error);
                });
            }
        }).catch(error => {
            notification.error({
                message: "Số điện thoại hoặc mật khẩu không đúng. Vui lòng thử lại!",
                description: error.message
            });
        });
    };
};

export const setCurrentUser = user => {
    return {
        type: Types.SET_CURRENT_USER,
        user
    };
};