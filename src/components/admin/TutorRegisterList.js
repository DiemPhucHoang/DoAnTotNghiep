import React, { Component } from 'react';

class TutorRegisterList extends Component {
    render() {
        return (
            <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên GS</th>
                                <th>Điện thoại</th>
                                <th>Nghề nghiệp</th>
                                <th>Ngành học </th>
                                <th>Hình thức nhận lớp</th>
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

export default TutorRegisterList;