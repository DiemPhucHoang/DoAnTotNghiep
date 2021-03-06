import axios from 'axios';
import * as Config from '../constants/Config';
import { trackPromise } from 'react-promise-tracker';

export default function callApi(endpoint, method = 'GET', body) {
      // return axios({
      //       method: method,
      //       url: `${Config.API_URL}/${endpoint}`,
      //       data: body
      // });
      let ax = axios({
            method: method,
            url : `${Config.API_URL}/${endpoint}`,
            data : body
      });
      return trackPromise(ax);
};