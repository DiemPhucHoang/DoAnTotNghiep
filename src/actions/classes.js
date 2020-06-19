import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

export const actCreateClassesRequest = (classInfo) => {
    return dispatch => {
        return callApi('class', 'POST', classInfo).then(res => {
            console.log("class: ", res.data);
            if (res.status === 200) {
                dispatch(actCreateClasses());
                notification.success({
                        message: "Success",
                        description:
                          "Đăng yêu cầu thành công!"
                      });
                
            }
        }).catch(error => {
            notification.error({
                  message: "Error ",
                  description: "Đăng yêu cầu không thành công!"
            });
        });
    }
}

export const actCreateClasses = () => {
    return {
        type: Types.DELETE_ALL_CHOOSE_TUTOR,
    }
}
