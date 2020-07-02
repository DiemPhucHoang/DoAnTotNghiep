import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

export const actCreateClassesRequest = (classInfo, hasChooseTutors, history) => {
    return dispatch => {
        return callApi('class', 'POST', classInfo).then(res => {
            if (res.status === 200) {
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

            }
        }).catch(error => {
            notification.error({
                message: "Error ",
                description: "Đăng yêu cầu không thành công!"
            });
        });
    }
}

//delete all choose tutor
export const actDeleteChooseTutors = () => {
    return {
        type: Types.DELETE_ALL_CHOOSE_TUTOR,
    }
}

//create class
// export const actCreateClass = (classes) => {
//     return {
//         type: Types.CREATE_CLASS,
//         classes
//     }
// }

export const actFetchClassesRequest = (page) => {
    return dispatch => {
        return callApi(`class?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200) {
                dispatch(actFetchClasses(res.data));
            }
        }).catch(error => {
            console.log(error.message);
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
                if (res.status === 200) {
                    dispatch(actSearchClasses(res.data));
                }
            }).catch(error => {
                console.log(error.message);
            })
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
            if(res.status === 200) {
                dispatch(actFetchClassDetail(res.data));
            }
        }).catch(error => {
            console.log(error.message);
        })
    }
}

export const actFetchClassDetail = classes => {
    return {
        type: Types.FETCH_CLASS_DETAIL,
        classes
    }
}