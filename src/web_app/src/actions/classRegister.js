import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";


//get list class register
export const actFetchClassRegisterRequest = () => {
      return dispatch => {
          return callApi(`register-class/tutor/${localStorage.getItem("id")}`, "GET", null).then(res => {
              if (res.status === 200 && res.data.success) {
                  dispatch(actFetchClassRegister(res.data));
              }
           }).catch(err => {
              console.log(err);
        });
      };
  };
  
  export const actFetchClassRegister = classRegister => {
      return {
          type: Types.FETCH_CLASS_REGISTER,
          classRegister
      };
  };

//change status class register
export const actChangeStatusClassRegisterRequest = (idRegister) => {
      return dispatch => {
          return callApi(`register-class/${idRegister}`, "PATCH", null).then(res => {
              if (res.status === 200 && res.data.success) {
                  dispatch(actChangeStatusClassRegister(idRegister));
                  notification.success({
                        message: "Success",
                        description: "Hủy thành công!"
                  });
              }
           }).catch(err => {
              console.log(err);
        });
      };
  };
  
  export const actChangeStatusClassRegister = idRegister => {
      return {
          type: Types.CHANGE_STATUS_CLASS_REGISTER,
          idRegister
      };
  };