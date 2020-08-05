import React, { Component } from 'react';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import { Link } from 'react-router-dom';
import { Card, Grid } from '@material-ui/core';
import ParentRegisterList from '../../components/admin/ParentRegisterList';
import ParentRegisterItem from '../../components/admin/ParentRegisterItem';
import { actAllParentRegisterTutorRequest } from '../../actions/parentRegisterTutor';
import { connect } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

class DuyetPHChonGS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        }
    }

    componentDidMount() {
        let number = this.state.activePage - 1;
        this.props.fetchAllParentRegisterTutor(number);
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        this.props.fetchAllParentRegisterTutor(number);
    }

    showParentRegister(parentRegisters) {
        var result = null;
        const hasParentRegisters = parentRegisters && parentRegisters.length > 0;
        if (hasParentRegisters) {
            result = parentRegisters.map((parentRegisterItem, index) => {
                return (
                    <ParentRegisterItem
                        key={index}
                        parentRegisterItem={parentRegisterItem}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
    render() {
        const { parentRegisters } = this.props;
        const { content } = parentRegisters;
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
                                <li className="breadcrumb-item active">Duyệt phụ huynh chọn gia sư</li>
                            </ol>
                        </div>
                        <div className="container-fluid ">
                            <Card variant="elevation">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <i className="fas fa-table" />
                                            <span>Danh sách yêu cầu tìm gia sư</span>
                                        </div>
                                    </div>
                                </div>
                                <ParentRegisterList>
                                    {this.showParentRegister(content)}
                                </ParentRegisterList>
                                <div >
                                    <Pagination style={{ float: "right" }}
                                        count={parentRegisters.totalPages}
                                        page={parentRegisters.number + 1}
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
        parentRegisters: state.parentRegisterTutor,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllParentRegisterTutor: (page) => {
            dispatch(actAllParentRegisterTutorRequest(page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetPHChonGS);