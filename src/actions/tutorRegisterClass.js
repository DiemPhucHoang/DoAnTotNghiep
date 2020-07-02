import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

//tutor register class
export const actTutorRegisterClassRequest = (registerInfo, idClass) => {
    return dispatch => {
        return callApi(
            `register-class/${idClass}`,
            "POST",
            registerInfo
        )
            .then(res => {
                if (res.status === 200 && res.data.status) {
                    dispatch(actTutorRegisterClass(res.data));
                    notification.success({
                        message: "Success",
                        description: "Đăng ký nhận lớp thành công. Vui lòng chờ trung tâm duyệt đăng ký. Trung tâm sẽ liên hệ với bạn sau!"
                    });
                }
            })
            .catch(error => {
                notification.error({
                    message: "Bạn đã đăng ký lớp này!",
                    description: error.message
                });
            });
    };
};

//dispatch redux
export const actTutorRegisterClass = registerInfo => {
    return {
        type: Types.TUTOR_REGISTER_CLASS,
        registerInfo
    };
};

//get list tutor register class
export const actFetchTutorRegisterClassRequest = idClass => {
    return dispatch => {
      return callApi(
        `register-class/class/${idClass}`,
        "GET",
        null
      )
        .then(res => {
          if (res.status === 200) {
            dispatch(actFetchTutorRegisterClass(res.data));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
  };
  
export const actFetchTutorRegisterClass = tutorRegister => {
    return {
      type: Types.FETCH_TUTOR_REGISTER_CLASS,
      tutorRegister
    };
};