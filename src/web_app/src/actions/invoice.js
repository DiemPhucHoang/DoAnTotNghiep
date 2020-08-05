import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";
import { notification } from "antd";
import "antd/dist/antd.css";

// get all class
export const actFetchInvoiceRequest = (page) => {
    return dispatch => {
        return callApi(`invoice/all?page=${page}`, 'GET', null).then(res => {
            if (res.status === 200 && res.data.success) {
                dispatch(actFetchInvoice(res.data));
            }
        }).catch(err => {
            console.log(err);
      });
    }
}

export const actFetchInvoice = (invoices) => {
    return {
        type: Types.FETCH_ALL_INVOICE,
        invoices
    }
}
