import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ClassItem extends Component {
    render() {
        const { classItem, index } = this.props;
        console.log("item: "+classItem)
        return (
            <tr>
                <td>{classItem.id}</td>
                <td>{classItem.classTeach}</td>
                <td>{classItem.subject}</td>
                <td>{classItem.tuitionFee}</td>
                <td>{classItem.levelRequirement}</td>
                <td>{classItem.genderRequirement}</td>
                <td>{classItem.status}</td>
                <td>
                    <Link 
                        to={`/admin/class/${classItem.id}`} 
                        className="btn btn-success btn-sm">
                        Sửa
                    </Link>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.onDelete(classItem.id)}>
                        Xóa
                    </button>
                </td>
            </tr>
        );
    }
    onDelete = (id) => {
        if (confirm(`Bạn có chắc chắn muốn xóa lớp có id ${id} không?`)) { //eslint-disable-line
            this.props.onDelete(id);
        }
    }
}

export default ClassItem;