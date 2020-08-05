import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClassRegisterItem extends Component {
    render() {
        var { tutorRegisterItem, index } = this.props;
        
        return (
            <tr style={{backgroundColor: `${tutorRegisterItem.status === "Đã duyệt" ? "#da9494" : ""}`}}>
                <td>{index + 1}</td>
                <td>{tutorRegisterItem.idClass}</td>
                <td>{tutorRegisterItem.classTeach}</td>
                <td>{tutorRegisterItem.subject}</td>
                <td>{tutorRegisterItem.tuitionFee}</td>
                <td>{tutorRegisterItem.district}</td>
                <td>{tutorRegisterItem.noTutor}</td>
                <td>
                    <Link 
                        to={`/admin/duyet-gia-su-dk-lop/${tutorRegisterItem.idClass}`} 
                        className="btn btn-success btn-sm">
                        Xem
                    </Link>
                </td>
            </tr>
        );
    }
}

export default ClassRegisterItem; 