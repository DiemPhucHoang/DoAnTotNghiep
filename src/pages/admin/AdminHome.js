import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import ChartBar from '../../components/admin/ChartBar';
import ChartPie from '../../components/admin/ChartPie';
import Overview from '../../components/admin/Overview';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';

class AdminHome extends Component {
    render() {
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            {/* Breadcrumbs*/}
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item active">Overview</li>
                            </ol>
                            {/* Icon Cards*/}
                            <Overview />

                            {/* Area Chart Example*/}

                            <div className="row ">
                                <div className="col-md-7">
                                    <ChartBar />
                                </div>
                                <div className="col-md-5">
                                    <ChartPie />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHome;