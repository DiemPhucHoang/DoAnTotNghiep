import React, { Component } from 'react';
import { Card, Grid } from '@material-ui/core';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import { Link } from 'react-router-dom';
import { actFetchClassDetailRequest } from '../../actions/classes';
import { actFetchTutorRegisterDetailRequest } from '../../actions/tutorRegisterClass';
import { connect } from 'react-redux';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import TutorRegisterList from '../../components/admin/TutorRegisterList';
import TutorRegisterItem from '../../components/admin/TutorRegisterItem';

class DuyetGSDKDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditClass(id);
            this.props.onGetTutorRegister(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.classes) {
            var { classes } = nextProps;
            this.setState({
                idClass: classes.id,
                classTeach: classes.classTeach,
                subject: classes.subject,
                timeTeach: classes.timeTeach,
                address: classes.address,
                district: classes.district,
                tuitionFee: classes.tuitionFee,
                genderRequirement: classes.genderRequirement,
                levelRequirement: classes.levelRequirement,
                status: classes.status,
                time: classes.time,

            });
        }
    }

    render() {
        const { classes, tutorRegisters } = this.props;
        const { content } = tutorRegisters;
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/admin/duyet-gia-su-dk-lop">Duyệt gia sư đăng ký dạy</Link>
                                </li>
                                <li className="breadcrumb-item active">Thông tin chi tiết</li>
                            </ol>
                            <div className="row">
                                <div className="col-md-8">
                                    <Card elevation={3} className="profile">

                                        <h5><strong>Danh sách gia sư đăng ký dạy</strong></h5>
                                        <hr />
                                        <TutorRegisterList>
                                            {this.showTutorRegister(content)}
                                        </TutorRegisterList>

                                        <p>Ghi chú: <br />
                                            <label className="statusRed"></label> Đã nhận lớp
                                        </p>
                                    </Card>
                                </div>
                                <div className="col-md-4">
                                    <Card elevation={3} className="profile">
                                        <h5><strong>Thông tin lớp</strong></h5>
                                        <hr />
                                        <p><strong>Môn dạy:</strong> {classes.subject}</p>
                                        <p><strong>Lớp dạy:</strong> {classes.classTeach}</p>
                                        <p><strong>Lương:<span style={{ color: "#fc0505" }}> {classes.tuitionFee} vnđ/tháng</span></strong></p>
                                        <p><strong>Thời gian:</strong> {classes.timeTeach}</p>
                                        <p><strong>Yêu cầu trình độ:</strong> {classes.levelRequirement}</p>
                                        <p><strong>Yêu cầu giới tính:</strong> {classes.genderRequirement}</p>
                                        <p><span style={{ color: "#fc0505" }}><RoomSharpIcon /></span>
                                            <span style={{ color: "#356ff4" }}> {classes.address} , {classes.district}, TP.HCM </span>
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    showTutorRegister(tutorRegisters) {
        var result = null;
        const hasTutorRegisters = tutorRegisters && tutorRegisters.length > 0;
        if (hasTutorRegisters) {
            result = tutorRegisters.map((tutorRegisterItem, index) => {
                return (
                    <TutorRegisterItem
                        key={index}
                        tutorRegisterItem={tutorRegisterItem}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditClass: (id) => {
            dispatch(actFetchClassDetailRequest(id));
        },
        onGetTutorRegister: (id) => {
            dispatch(actFetchTutorRegisterDetailRequest(id));
        }
    }
}
const mapStateToProps = state => {
    return {
        classes: state.classes,
        tutorRegisters: state.tutorRegisterClass
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetGSDKDetail);