import React, { Component } from 'react';
import { Grid, Paper, AppBar, Toolbar, Typography } from '@material-ui/core';
import LopMoiDetail from './../components/dangKyDay/LopMoiDetail';
import { connect } from 'react-redux';
import { actFetchClassDetailRequest } from './../actions/classes';
import FormDangKyNhanLop from './../components/dangKyDay/FormDangKyNhanLop';
import DanhSachGiaSuDaDangKy from './../components/dangKyDay/DanhSachGiaSuDaDangKy';
import DanhSachLopTuongTu from './../components/dangKyDay/DanhSachLopTuongTu';
import { actTutorRegisterClassRequest, actFetchTutorRegisterClassRequest } from './../actions/tutorRegisterClass';
import callApi from './../utils/apiCaller';
import Footer from '../components/Footer';
import Header from '../components/Header';

class DangKyDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classesSimilar: []
        }
    }

    componentDidMount() {
        const { match } = this.props;
        if (match) {
            const id = match.params.id;
            this.getData(id);
        }
    }

    onRegisterClass = (registerInfo) => {
        this.props.onHandleRegisterClass(registerInfo, this.props.classes.id);
    }
    showClassDetail = (id) => {
        this.getData(id);
    }

    getData = (id) => {
        this.props.onFetchClassDetail(id);
        this.props.onFetchTutorRegisterClass(id);
        callApi(`class/similar/${id}`, 'GET', null).then(res => {
            if (res.status === 200 && res.data.success) {
                this.setState({
                    classesSimilar: res.data.result
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className="bg-color">
                    <div className="px-5 pt-5 pb-3 mx-5">
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    LỚP ĐANG CẦN GIA SƯ
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper style={{ width: "100%", paddingBottom: "20px" }}>
                            <Grid container style={{ paddingRight: "20px" }}>
                                <LopMoiDetail length={this.props.tutorRegisterClass?.content?.length} classItem={classes} />
                                <FormDangKyNhanLop onRegisterClass={this.onRegisterClass} />
                            </Grid>
                            <hr />
                            {this.props.tutorRegisterClass.length <= 0 ? (
                                <Grid container className="padding-class">
                                    <strong>Hiện tại chưa có gia sư nào đăng ký nhận lớp này</strong>
                                </Grid>
                            ) : (
                                    <DanhSachGiaSuDaDangKy tutorRegisterClass={this.props.tutorRegisterClass?.content} />
                                )}

                            <hr />
                            <Grid container className="padding-class">
                                <Grid item xs={12}>
                                    <p style={{ fontStyle: "italic" }}>
                                        <strong style={{ color: "red" }}>(*)</strong>Cho phép tối đa 5 người
                                    đăng ký. Chỉ giao lớp cho 1 người đủ điều kiện đóng lệ phí trước.
                                </p>
                                    <p>
                                        <strong style={{ color: "red" }}>Lưu ý</strong>: Trung tâm{" "}
                                        <span style={{ fontWeight: "bold" }}>Gia sư Ánh Dương</span> ưu tiên
                                    người đủ điều kiện, đóng lệ phí sớm. Trước khi chuyển khoản hoặc tới
                                    trung tâm theo giờ bạn đã hẹn hãy gọi số{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                            0902684422 hoặc 0902504900
                                    </span>{" "}
                                    để kiểm tra trạng thái lớp chính xác.
                                </p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <DanhSachLopTuongTu
                        showClassDetail={this.showClassDetail}
                        classesSimilar={this.state.classesSimilar}
                        history={this.props.history} />
                </div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        classes: state.classes,
        tutorRegisterClass: state.tutorRegisterClass
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchClassDetail: (id) => {
            dispatch(actFetchClassDetailRequest(id));
        },
        onHandleRegisterClass: (registerInfo, idClass) => {
            dispatch(actTutorRegisterClassRequest(registerInfo, idClass));
        },
        onFetchTutorRegisterClass: idClass => {
            dispatch(actFetchTutorRegisterClassRequest(idClass));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangKyDay);