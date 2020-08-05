import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const actFetchRatesRequest = (idTutor) => {
      return dispatch => {
          return callApi(`rate/${idTutor}`, 'GET', null).then(res => {
              if (res.status === 200) {
                  dispatch(actFetchRates(res.data));
              }
          }).catch(err => {
              console.log(err);
        });
      }
  }
  
  export const actFetchRates = (rates) => {
      return {
          type: Types.FETCH_RATE,
          rates
      }
  }