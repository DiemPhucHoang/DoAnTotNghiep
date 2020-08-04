import React, { Component } from 'react';

class ParentRegisterList extends Component {
    render() {
        return (
            <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên PH</th>
                                <th>Lớp</th>
                                <th>Môn</th>
                                <th>Quận</th>
                                <th>Số gia sư </th>
                                <th>Tác vụ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </div>
        );
    }
}

export default ParentRegisterList;