import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ParentRegisterItem extends Component {
    render() {
        const { parentRegisterItem, index } = this.props;

        return (
            <tr style={{backgroundColor: `${parentRegisterItem.status === "Đã duyệt" ? "#da9494" : ""}`}}>
                <td>{index + 1}</td>
                <td>{parentRegisterItem.nameParent}</td>
                <td>{parentRegisterItem.classTeach}</td>
                <td>{parentRegisterItem.subject}</td>
                <td>{parentRegisterItem.district}</td>
                <td>{parentRegisterItem.noTutor} </td>
                <td>
                    <Link 
                        to={`/admin/duyet-phuynh-chon-giasu/${parentRegisterItem.idClass}`} 
                        className="btn btn-success btn-sm">
                        Xem
                    </Link>
                </td>
            </tr>
        );
    }
}

export default ParentRegisterItem; 