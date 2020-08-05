import React, { Component } from 'react';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import { Link } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import ClassRegisterList from '../../components/admin/ClassRegisterList';
import ClassRegisterItem from '../../components/admin/ClassRegisterItem';
import { actAllTutorRegisterClassRequest } from '../../actions/tutorRegisterClass';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

class DuyetGiaSuDKLop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        }
    }

    componentDidMount() {
        let number = this.state.activePage - 1;
        this.props.fetchAllTutorRegisterClass(number);
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        this.props.fetchAllTutorRegisterClass(number);
    }

    showClassRegister(tutorRegisters) {
        var result = null;
        const hasTutorRegisters = tutorRegisters && tutorRegisters.length > 0;
        if (hasTutorRegisters) {
            result = tutorRegisters.map((tutorRegisterItem, index) => {
                return (
                    <ClassRegisterItem
                        key={index}
                        tutorRegisterItem={tutorRegisterItem}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
    render() {
        const { tutorRegisters } = this.props;
        const { content } = tutorRegisters;
        return (
            <div>
                <Nav history={this.props.history}/>
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            {/* Breadcrumbs*/}
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item active">Duyệt gia sư đăng ký lớp</li>
                            </ol>
                        </div>
                        <div className="container-fluid ">
                            <Card variant="elevation">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <i className="fas fa-table" />
                                            <span>GIA SƯ ĐĂNG KÝ LỚP</span>
                                        </div>
                                    </div>
                                </div>
                                <ClassRegisterList>
                                    {this.showClassRegister(content)}
                                </ClassRegisterList>
                                <div >
                                    <Pagination style={{ float: "right" }}
                                        count={tutorRegisters.totalPages}
                                        page={tutorRegisters.number + 1}
                                        onChange={this.onChange}
                                        color="primary" />
                                </div>
                                <Grid>
                                    <p style={{marginLeft: '30px'}}>Ghi chú: <br/><label className="statusRed"></label> Đã duyệt</p>
                                </Grid>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tutorRegisters: state.tutorRegisterClass,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTutorRegisterClass: (page) => {
            dispatch(actAllTutorRegisterClassRequest(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetGiaSuDKLop);