import React, { Component } from 'react';

class InvoiceList extends Component {
    
    render() {
        return (
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID Lớp</th>
                                <th>Lớp dạy</th>
                                <th>Gia sư</th>
                                <th>Lệ phí</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>#</th>
                                <th>ID Lớp</th>
                                <th>Lớp dạy</th>
                                <th>Gia sư</th>
                                <th>Lệ phí</th>
                                <th>Thời gian</th>
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

export default InvoiceList;