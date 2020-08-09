import React, { Component } from 'react';
import moment from 'moment';
import {actUpdateTutorRegisterClassRequest} from '../../actions/tutorRegisterClass';
import { connect } from 'react-redux';


class TutorRegisterItem extends Component {
    onUpdateStatus = (idTutorRegisterClass, idClass, e) => {
         e.preventDefault();
         this.props.onUpdateTutorRegisterClass(idTutorRegisterClass, idClass);
    }
    
    render() {
        const { tutorRegisterItem, index } = this.props;
        const colorStatus =
              tutorRegisterItem.status === "Đã hủy"
              ? '#efdada'
              : tutorRegisterItem.status === "Đã nhận lớp"
              ? '#da9494'
              : '';
        return (
            <tr style={{ backgroundColor: `${colorStatus}`}}>
                <td>{index + 1}</td>
                <td>{tutorRegisterItem.nameTutor}</td>
                <td>{tutorRegisterItem.phone}</td>
                <td>{tutorRegisterItem.level}</td>
                <td>{tutorRegisterItem.major} - {tutorRegisterItem.college}</td>
                <td>{tutorRegisterItem.payment} 
                    <br/> ({moment(tutorRegisterItem.dateReceive).format('DD/MM/YYYY')}) </td>
                <td>
                    {
                        tutorRegisterItem.status === "Xem xét" 
                        ?  <button className="btn btn-success btn-sm" 
                                onClick={ (e) =>this.onUpdateStatus(tutorRegisterItem.idTutorRegisterClass, tutorRegisterItem.idClass , e)}>
                                Duyệt
                            </button>
                        : tutorRegisterItem.status === "Đã nhận lớp"
                        ? <button disabled>Đã duyệt</button>
                        : tutorRegisterItem.status === "Đã hủy"
                        ? <button disabled>Đã hủy</button>
                        : <button disabled>Không đạt</button>
                    }
                </td>
            </tr>
        );
    }
}
const mapStateToProps = state => {
    return {
        tutorRegisters: state.tutorRegisterClass
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateTutorRegisterClass: (idTutorRegisterClass, idClass) => {
             dispatch(actUpdateTutorRegisterClassRequest(idTutorRegisterClass, idClass));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorRegisterItem); 