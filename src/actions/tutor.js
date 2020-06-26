import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
// import setAuthorization from "../utils/setAuthorizationToken";
// import jwtDecode from "jwt-decode";

export const actFetchTutorsRequest = (page) => {
    return dispatch => {
        return callApi(`tutor?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200) {
                dispatch(actFetchTutors(res.data));
            }
        }).catch(error => {
            console.log(error);
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
        }).catch(error => {
          console.log(error.message);
        })
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
      `tutor/${id}`, "GET", id).then(res => {
        if (res.status === 200) {
          if(chooseTutor) {
            dispatch(actChooseTutor(res.data));
          }else {
            dispatch(actFetchTutorDetail(res.data));
          }
        }
      }).catch(error => {
        notification.error({
          message: "Error ",
          description: error.message
        });
      })
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