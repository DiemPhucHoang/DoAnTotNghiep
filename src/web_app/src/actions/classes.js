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
                    notification.success({
                        message: "Success",
                        description:
                            "Chọn gia sư thành công!"
                    });
                }
                else {
                    history.push("/lop-moi");
                    notification.success({
                        message: "Success",
                        description:
                            "Đăng yêu cầu thành công!"
                    });
                }
            } else {
                notification.error({
                    message: "Failed",
                    description: res.data.result
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


// update class
export const actUpdateClassRequest = (classes, history) => {
    return dispatch => {
        callApi('class', 'PATCH', classes)
        .then(res => {
            dispatch(actUpdateClass(res.data));
            history.push("/admin/quan-ly-lop");
            if (res.status === 200 && res.data.success) {               
                notification.success({
                    message: "Success",
                    description: "Chỉnh sửa lớp thành công!"
                });
            }
            else{
                notification.error({
                    message: "Error",
                    description: "Sửa lớp thất bại!"
                });
            }
        })
    }
}
export const actUpdateClass = (classes) => {
    return {
        type: Types.UPDATE_CLASS,
        classes
    }
}

// get all class
export const actFetchAllClassesRequest = (page) => {
    return dispatch => {
        return callApi(`class/all?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actFetchAllClasses(res.data));
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actFetchAllClasses = (classes) => {
    return {
        type: Types.FETCH_ALL_CLASSES,
        classes
    }
}

// delete class
export const actDeleteClassRequest = (id, history) => {
    return dispatch => {
        return callApi(`class/${id}`, 'DELETE', null).then(res => {
           
            if (res.status === 200 && res.data.success) {               
                notification.success({
                    message: "Success",
                    description: "Xóa lớp thành công!"
                });
                
            }
            else{
                notification.error({
                    message: "Error",
                    description: "Lớp này không thể xóa!"
                });
            }
           
        }).then(
            setTimeout(() => {  window.location.reload(); }, 2000)     
        ); 
    }
}
export const actDeleteClass = (id) => {
    return {
        type: Types.DELETE_CLASS,
        id
    }
}


//search classes all
export const actSearchAllClassesRequest = (searchInput, page) => {
    return dispatch => {
        return callApi(
            `class/searchAll?page=${page}`, "POST", searchInput).then(res => {
                if (res.status === 200 && res.data.success) {
                    dispatch(actSearchClasses(res.data));
                }
            }).catch(err => {
                console.log(err);
          });
    }
}
export const actSearchAllClasses = classes => {
    return {
        type: Types.SEARCH_ALL_CLASS,
        classes
    };
}


// add class
export const actAddClassRequest = (classes, phoneParent, history) => {
    return dispatch => {
        return callApi(`class/addClass?phone=${phoneParent}`,
        'POST', classes).then(res => {
            dispatch(actAddClass(res.data));
            history.push("/admin/quan-ly-lop");
            if (res.status === 200 && res.data.success) {               
                notification.success({
                    message: "Success",
                    description: "Thêm lớp thành công!"
                });
            }
            else{
                notification.error({
                    message: "Error",
                    description: "Thêm lớp thất bại! " + res.data.result
                });
            }
        })
    }
}
export const actAddClass = (classes) =>{
    return {
        type: Types.ADD_CLASS,
        classes
    }
}