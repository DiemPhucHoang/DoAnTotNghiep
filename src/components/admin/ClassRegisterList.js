import React, { Component } from 'react';

class ClassRegisterList extends Component {
    render() {
        return (
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Mã lớp</th>
                                <th>Lớp dạy</th>
                                <th>Môn dạy</th>
                                <th>Lương</th>
                                <th>Quận dạy</th>
                                <th>Số gia sư ĐK</th>
                                <th>Tác vụ</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>Mã lớp</th>
                                <th>Lớp dạy</th>
                                <th>Môn dạy</th>
                                <th>Lương</th>
                                <th>Quận dạy</th>
                                <th>Số gia sư ĐK</th>
                                <th>Tác vụ</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ClassRegisterList;