import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

//get all parent register tutor
export const actAllParentRegisterTutorRequest = (page) => {
    console.log("res.data")
    return dispatch => {
        return callApi(`parent-register-tutor?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actAllParentRegisterTutor(res.data));
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err);
      });
    }
};

export const actAllParentRegisterTutor = (parentRegisters) => {
    return {
        type: Types.FETCH_ALL_PARENT_REGISTER_TUTOR,
        parentRegisters
    }
}

//get list tutor by id class
export const actFetchTutorDetailRequest = idClass => {
    return dispatch => {
        return callApi(`parent-register-tutor/tutor/${idClass}`,"GET", null
        ).then(res => {
            if (res.status === 200) {
                dispatch(actFetchTutorDetail(res.data));
            }
         }).catch(err => {
            console.log(err);
      });
    };
};

export const actFetchTutorDetail = parentRegisters => {
    return {
        type: Types.FETCH_TUTOR_DETAIL_BY_CLASS,
        parentRegisters
    };
};

export const actUpdateParentRegisterTutorRequest = (idClass, idTutor) => {
    return dispatch => {
        return callApi(`parent-register-tutor/updateStatus/${idClass}/${idTutor}`,"PATCH", null
        ).then(res => {
            if (res.status === 200) {
                dispatch(actFetchTutorDetail(res.data));
            }
         }).catch(err => {
            console.log(err);
      });
    };
};

