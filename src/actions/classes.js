import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

//create class
export const actCreateClassesRequest = (classInfo, hasChooseTutors, history) => {
    return dispatch => {
        return callApi('class', 'POST', classInfo).then(res => {
            if (res.status === 200 && res.data.success) {
                if (hasChooseTutors) {
                    dispatch(actDeleteChooseTutors());
                    history.push("/tim-gia-su");
                }
                else {
                    history.push("/lop-moi");
                    // dispatch(actCreateClass(res.data));
                }
                notification.success({
                    message: "Success",
                    description:
                        "Đăng yêu cầu thành công!"
                });

            } else {
                notification.error({
                    message: "Failed",
                    description: "Đăng yêu cầu không thành công!"
                });
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

//delete all choose tutor
export const actDeleteChooseTutors = () => {
    return {
        type: Types.DELETE_ALL_CHOOSE_TUTOR,
    }
}

export const actFetchClassesRequest = (page) => {
    return dispatch => {
        return callApi(`class?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actFetchClasses(res.data));
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actFetchClasses = (classes) => {
    return {
        type: Types.FETCH_CLASSES,
        classes
    }
}

//get input search
export const actSearchInputClassRequest = searchInput => {
    return {
        type: Types.SEARCH_INPUT_CLASS,
        searchInput
    }
}

//search classes
export const actSearchClassesRequest = (searchInput, page) => {
    return dispatch => {
        return callApi(
            `class/search?page=${page}`, "POST", searchInput).then(res => {
                if (res.status === 200 && res.data.success) {
                    dispatch(actSearchClasses(res.data));
                }
            }).catch(err => {
                console.log(err);
          });
    }
}
export const actSearchClasses = classes => {
    return {
        type: Types.SEARCH_CLASS,
        classes
    };
}

//get class by id
export const actFetchClassDetailRequest = (id) => {
    return dispatch => {
        return callApi(`class/${id}`, "GET", null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actFetchClassDetail(res.data));
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actFetchClassDetail = classes => {
    return {
        type: Types.FETCH_CLASS_DETAIL,
        classes
    }
}

//delete search
export const actDeleteSearchInputClass = () => {
    return {
        type: Types.DELETE_SEARCH_INPUT_CLASS
    };
}



