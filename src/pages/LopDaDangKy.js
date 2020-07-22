import React, { Component } from 'react';
import {AppBar, Toolbar, Typography
} from '@material-ui/core';
import { actFetchClassRegisterRequest, actChangeStatusClassRegisterRequest } from './../actions/classRegister';
import { connect } from 'react-redux';
import LopGoiY from '../components/lopDaDangKy/LopGoiY';
import callApi from '../utils/apiCaller';
import DanhSachLop from '../components/lopDaDangKy/DanhSachLop';

class LopDaDangKy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classesSuggest: []
        }
    }
    componentDidMount() {
        this.props.fetchClassRegister();
        callApi(`class/suggest/${localStorage.getItem("id")}`, 'GET', null).then(res => {
            if(res.status === 200 && res.data.success) {
                this.setState({
                    classesSuggest: res.data.result
                });
            }
        }).catch(error => {
            console.log(error);
        });

    }

    onChangeStatus = (idRegister) => {
        if (confirm('Bạn chắc chắn muốn hủy đăng ký?')) { //eslint-disable-line
            this.props.changeStatus(idRegister);
        }
    }

    render() {
        return (
            <div className="bg-color">
                <div className="px-5 pt-5 pb-3 mx-5">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                LỚP ĐÃ ĐĂNG KÝ
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DanhSachLop classRegister={this.props.classRegister} onChangeStatus={this.onChangeStatus}/>
                    <br />
                    <LopGoiY classesSuggest={this.state.classesSuggest} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        classRegister: state.classRegister
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchClassRegister: () => {
            dispatch(actFetchClassRegisterRequest());
        },
        changeStatus: (idRegister) => {
            dispatch(actChangeStatusClassRegisterRequest(idRegister));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LopDaDangKy);