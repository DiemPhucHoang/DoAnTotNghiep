import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

//create tutor
export const actCreateTutorRequest = (tutorInfo) => {
    return dispatch => {
        return callApi(`tutor/${localStorage.getItem("id")}`, 'POST', tutorInfo).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actCreateTutor(res.data));
                notification.success({
                    message: "Success",
                    description: "Cập nhật hồ sơ thành công!"
                });
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actCreateTutor = tutor => {
    return {
        type: Types.CREATE_TUTOR,
        tutor
    }
}

//change info tutor
export const actChangeInfoTutorRequest = (tutorInfo, idTutor) => {
    return dispatch => {
        return callApi(`tutor/edit/${idTutor}`, 'POST', tutorInfo).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actChangeInfoTutor(res.data));
                notification.success({
                    message: "Success",
                    description: "Cập nhật hồ sơ thành công!"
                });
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actChangeInfoTutor = tutor => {
    return {
        type: Types.CHANGE_INFO_TUTOR,
        tutor
    }
}

//fetch tutors
export const actFetchTutorsRequest = (page) => {
    return dispatch => {
        return callApi(`tutor?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200) {
                dispatch(actFetchTutors(res.data));
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actFetchTutors = tutors => {
    return {
        type: Types.FETCH_TUTORS,
        tutors
    }
}

//search dynamic tutors
export const actSearchTutorsRequest = (searchInput, page) => {
    return dispatch => {
        return callApi(
            `tutor/search?page=${page}`, "POST", searchInput).then(res => {
                if (res.status === 200) {
                    dispatch(actSearchTutors(res.data));
                }
            }).catch(err => {
                console.log(err);
          });
    }
}
export const actSearchTutors = tutors => {
    return {
        type: Types.SEARCH_TUTOR,
        tutors
    };
}

//get input search
export const actSearchInputRequest = searchInput => {
    return {
        type: Types.SEARCH_INPUT,
        searchInput
    }
}

//get tutor detail
export const actFetchTutorDetailRequest = (id, chooseTutor) => {
    return dispatch => {
        return callApi(
            `tutor/${id}`, "GET", null).then(res => {
                if (res.status === 200) {
                    if (chooseTutor) {
                        dispatch(actChooseTutor(res.data));
                    } else {
                        dispatch(actFetchTutorDetail(res.data));
                        console.log('res.data: ', res.data.result);
                    }
                }
            }).catch(err => {
                console.log(err);
          });
    }
}

export const actFetchTutorDetail = tutor => {
    return {
        type: Types.FETCH_TUTOR_DETAIL,
        tutor
    }
}

//get choose tutor
export const actChooseTutor = tutor => {
    return {
        type: Types.CHOOSE_TUTOR,
        tutor
    }
}

//delete choose tutor
export const actDeleteChooseTutor = id => {
    return {
        type: Types.DELETE_CHOOSE_TUTOR,
        id
    }
}

//get tutor by id user
export const actFetchTutorByIdUserRequest = () => {
    return dispatch => {
        return callApi(
            `tutor/user/${localStorage.getItem("id")}`, "GET", null).then(res => {
                if (res.status === 200 && res.data.success) {
                    dispatch(actFetchTutorByIdUser(res.data))
                }
            }).catch(err => {
                console.log(err);
          });
    }
}

export const actFetchTutorByIdUser = tutor => {
    return {
        type: Types.FETCH_TUTOR_BY_ID_USER,
        tutor
    }
}

//delete search
export const actDeleteSearchInputTutor = () => {
    return {
        type: Types.DELETE_SEARCH_INPUT_TUTOR
    };
}