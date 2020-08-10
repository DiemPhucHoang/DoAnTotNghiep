import React, { Component } from 'react';
import { Card, Grid } from '@material-ui/core';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import { Link } from 'react-router-dom';
import { actFetchClassDetailRequest } from '../../actions/classes';
import { actFetchTutorDetailRequest, actUpdateParentRegisterTutorRequest } from '../../actions/parentRegisterTutor';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';

class DuyetPHChonGSDetail extends Component {
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

    onUpdateStatus = (idClass, idTutor, e) => {
        e.preventDefault();
        this.props.onUpdateStatus(idClass, idTutor);
    }

    render() {
        const { classes, parentRegisters } = this.props;
        const { content } = parentRegisters;
        const hasParentRegisters = content && content.length > 0;
        return (
            <div>
                <Nav history={this.props.history}/>
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

                                        <h5><strong>Danh sách gia sư được chọn</strong></h5>
                                        <hr />
                                        <div className="table-responsive">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Tên GS</th>
                                                        <th>Điện thoại</th>
                                                        <th>Nghề nghiệp</th>
                                                        <th>Ngành học </th>
                                                        <th>Tác vụ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {hasParentRegisters && content.map((row) => (
                                                        <tr style={{backgroundColor: `${row.status === "DADONGY" ? "#da9494" : ""}`}}>
                                                            <td>{row.idTutor}</td>
                                                            <td>{row.nameTutor} <br/>
                                                                { row?.score !== undefined
                                                                   ? <Rating size="small" value={row?.score} readOnly style={{margin: '-10px'}}/>
                                                                   :''
                                                                   }
                                                            </td>
                                                            <td>{row.phone}</td>
                                                            <td>{row.level}</td>
                                                            <td>{row.major} - {row.college}</td>
                                                            <td>
                                                                {
                                                                    row.status === "CHUADONGY" 
                                                                    ? <button className="btn btn-success btn-sm"
                                                                        onClick={(e) => this.onUpdateStatus(row.idClass, row.idTutor, e)}>
                                                                        Duyệt
                                                                        </button>
                                                                    : row.status === "DADONGY"
                                                                    ? <button disabled>Đã duyệt</button>
                                                                    : <button disabled>Không đồng ý</button>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>


                                        <p>Ghi chú: <br />
                                            <label className="statusRed"></label> Đã đồng ý
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
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditClass: (id) => {
            dispatch(actFetchClassDetailRequest(id));
        },
        onGetTutorRegister: (id) => {
            dispatch(actFetchTutorDetailRequest(id));
        }, 
        onUpdateStatus: (idClass, idTutor) => {
            dispatch(actUpdateParentRegisterTutorRequest(idClass, idTutor))
        }
    }
}
const mapStateToProps = state => {
    return {
        classes: state.classes,
        parentRegisters: state.parentRegisterTutor
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DuyetPHChonGSDetail);