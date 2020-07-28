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

                callApi("auth", "GET", null).then(res => {
                    if (res.status === 200 && res.data.success) {
                        localStorage.setItem("id", res.data.result.id);
                        dispatch(setCurrentUser(res.data));
                        if (isTutor) {
                            history.push("/ho-so-gia-su");
                        } else {
                            history.push("/");
                        }
                        notification.success({
                            message: "Success",
                            description: "Đăng nhập thành công!"
                        });
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