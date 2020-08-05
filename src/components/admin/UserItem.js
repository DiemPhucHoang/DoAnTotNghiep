import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserItem extends Component {
    render() {
        var { useritem, index } = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{useritem.name}</td>
                <td>{useritem.phone}</td>
                <td>{useritem.address}</td>
                <td>{useritem.email}</td>
                <td>{useritem.role}</td>
                <td>
                    <Link 
                        to={`/admin/quan-ly-user/${useritem.id}`} 
                        className="btn btn-success btn-sm">
                        Xem
                    </Link>
                </td>
            </tr>
        );
    }
} 

export default UserItem;