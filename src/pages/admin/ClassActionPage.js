import React, { Component } from 'react';
import Step2 from './Step2';
import callApi from '../../utils/apiCaller';
import { actAddClassRequest } from '../../actions/classes';
import { connect } from 'react-redux';
import Menu from '../../components/admin/Menu';
import Nav from '../../components/admin/Nav';
import { Select, Input, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@material-ui/core';
import { notification } from "antd";

class ClassActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            classInfo: {
                idClass: null,
                classTeach: '',
                subject: [],
                timeTeach: '',
                address: '',
                district: '',
                tuitionFee: null,
                genderRequirement: 'Không yêu cầu',
                levelRequirement: 'Không yêu cầu',
                status: 'Lớp mới',
            },

            statusParent: 'old',
            subjects: [],
            districts: [],
            classTeaches: [],
        }
    }

    componentDidMount() {
        this.getAll();
    }
    getAll = () => {
        callApi('subject', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    subjects: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
        callApi('district', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    districts: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
        callApi('class-teach', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    classTeaches: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
    }

    onChange = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            classInfo: {
                ...prevState.classInfo,
                [name]: value,
            },
        }));
    }


    render() {
        return (
            <div>
                <Nav history={this.props.history}/>
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="/admin">Trang chủ</a>
                                </li>
                                <li className="breadcrumb-item active">Thêm lớp mới</li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form onSubmit={this.onSave}>
                                        <div className="form-group">
                                            <h3>Thêm thông tin lớp</h3>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Lớp dạy</label>
                                                        <FormControl variant="outlined" fullWidth required size="small">
                                                            <Select
                                                                fullWidth
                                                                labelId="demo-mutiple-checkbox-outlined-label"
                                                                id="demo-mutiple-checkbox-outlined"
                                                                multiple
                                                                label="Môn học"
                                                                size="small"
                                                                onChange={this.onChange}
                                                                variant="outlined"
                                                                name="subject"
                                                                value={this.state.classInfo.subject}
                                                                renderValue={(selected) => selected.join(', ')}
                                                            >
                                                                {this.state.subjects.map((subject) => (
                                                                    <MenuItem key={subject.subjectName} value={subject.subjectName}>
                                                                        <Checkbox checked={this.state.classInfo.subject.indexOf(subject.subjectName) > -1} />
                                                                        <ListItemText primary={subject.subjectName} />
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Lớp dạy</label>
                                                        <select required
                                                            className="form-control"
                                                            name="classTeach"
                                                            value={this.state.classTeach}
                                                            onChange={this.onChange}>
                                                            {this.state.classTeaches.map((classTeachItem) => (
                                                                <option>{classTeachItem.classTeachName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Lương (VNĐ)</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="tuitionFee"
                                                            value={this.state.tuitionFee}
                                                            onChange={this.onChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Thời gian dạy</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="timeTeach"
                                                            value={this.state.timeTeach}
                                                            onChange={this.onChange} required />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-8">
                                                    <div className="form-group">
                                                        <label>Địa chỉ dạy</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="address"
                                                            value={this.state.address}
                                                            onChange={this.onChange} required />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="form-group">
                                                        <label>Quận / Huyện</label>
                                                        <select required
                                                            className="form-control"
                                                            name="district"
                                                            value={this.state.district}
                                                            onChange={this.onChange}>
                                                            {this.state.districts.map((districtItem) => (
                                                                <option>{districtItem.districtName}</option>
                                                            ))}
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Yêu cầu trình độ</label>
                                                        <select required
                                                            className="form-control"
                                                            name="levelRequirement"
                                                            value={this.state.levelRequirement}
                                                            onChange={this.onChange}>
                                                            <option>Không yêu cầu</option>
                                                            <option>Sinh viên</option>
                                                            <option>Giáo viên</option>
                                                            <option>Cử nhân</option>
                                                            <option>Thạc sỹ/Tiến sỹ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Yêu cầu giới tính</label>
                                                        <select required
                                                            className="form-control"
                                                            name="genderRequirement"
                                                            value={this.state.genderRequirement}
                                                            onChange={this.onChange}>
                                                            <option>Không yêu cầu</option>
                                                            <option>Nam</option>
                                                            <option>Nữ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Trạng thái</label>
                                                        <select required
                                                            className="form-control"
                                                            name="status"
                                                            value={this.state.status}
                                                            onChange={this.onChange}>
                                                            <option>Chờ xác nhận</option>
                                                            <option>Lớp mới</option>
                                                            <option>Lớp đã giao</option>
                                                            <option>Lớp bị hủy</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Step2
                                            currentStep={this.state.currentStep}
                                            handleChange={this.handleChange}
                                            statusParent={this.state.statusParent}
                                            phoneParent={this.state.phoneParent}
                                        />
                                        {this.previousButton()}
                                        {this.nextButton()}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onSave = (e) => {
        e.preventDefault();
        var { history } = this.props;
        var statusParent = this.state.statusParent;

        var dataClass = {
            classTeach: this.state.classInfo.classTeach,
            subject: this.state.classInfo.subject.join(", "),
            timeTeach: this.state.classInfo.timeTeach,
            address: this.state.classInfo.address,
            district: this.state.classInfo.district,
            tuitionFee: this.state.classInfo.tuitionFee,
            genderRequirement: this.state.classInfo.genderRequirement,
            levelRequirement: this.state.classInfo.levelRequirement,
            status: this.state.classInfo.status
        }
        var phoneParent = this.state.phoneParent;
        if (statusParent === 'old') {
            this.props.onAddClass(dataClass, phoneParent, history);
        } else if (statusParent === 'new') {
            var dataParent = {
                name: this.state.nameParent,
                phone: this.state.phoneParent,
                address: this.state.addressParent,
                email: this.state.emailParent,
                role: 'PARENT'
            }
            callApi('auth/addUser', 'POST', dataParent).then(res => {
                if (res.status === 200 && res.data.success) {
                    this.props.onAddClass(dataClass, phoneParent, history);
                    history.goBack();
                } else {
                    notification.error({
                        message: "Error",
                        description: "Thêm lớp thất bại! " + res.data.result
                    });
                }
            }).catch(err => {
                console.log(err)
            });
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2 ? 3 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Quay lại
                </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 2) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Tiếp theo
                </button>
            )
        }
        return null;
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddClass: (classes, phoneParent, history) => {
            dispatch(actAddClassRequest(classes, phoneParent, history));
        }
    }
}

export default connect(null, mapDispatchToProps)(ClassActionPage);