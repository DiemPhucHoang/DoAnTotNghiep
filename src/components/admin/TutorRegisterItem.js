import React, { Component } from 'react';
import moment from 'moment';
import {actUpdateTutorRegisterClassRequest} from '../../actions/tutorRegisterClass';
import { connect } from 'react-redux';


class TutorRegisterItem extends Component {
    onUpdateStatus = (id, e) => {
        e.preventDefault();
        this.props.onUpdateTutorRegisterClass(id);
    }
    
    render() {
        const { tutorRegisterItem, index } = this.props;

        return (
            <tr style={{backgroundColor: `${tutorRegisterItem.status === "Đã nhận lớp" ? "#da9494" : ""}`}}>
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
                                onClick={ (e) =>this.onUpdateStatus(tutorRegisterItem.idTutorRegisterClass, e)}>
                                Duyệt
                            </button>
                        : 
                        <button disabled>Đã duyệt</button>
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
        onUpdateTutorRegisterClass: (id) => {
            dispatch(actUpdateTutorRegisterClassRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorRegisterItem); 