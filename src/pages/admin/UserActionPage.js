import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddUserRequest } from '../../actions/user';
import { actAddTutorRequest } from '../../actions/tutor';
import callApi from '../../utils/apiCaller';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import { Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

class UserActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: null,
            name: '',
            phone: '',
            address: '',
            email: '',
            password: '',
            role: 'ADMIN',

            errPhone: '',
            errAddress: '',
            errEmail: '',
            errPassword: '',

            // tutor
            tutorInfo: {
                subject: [],
                classTeach: [],
                district: []
            },
            gender: 'Nam',
            yearOfBirth: '',
            major: '',
            college: '',
            graduationYear: '',
            level: 'Sinh viên',
            moreInfo: '',
            salaryPerHour: '',

            // subjects
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

    validatePhone = () => {
        let isErr = false;
        let errors = {};
        const regexPhone = /^\d{10,11}$/;
        if (regexPhone.exec(this.state.phone) !== null) {
            isErr = false;
            errors.errPhone = ''
        }
        else {
            isErr = false;
            errors.errPhone = 'Số điện thoại phải 10 - 11 ký tự'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isErr;

    }
    validateEmail = () => {
        let isErr = false;
        let errors = {};
        const regexpEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (regexpEmail.exec(this.state.email) !== null) {
            isErr = false;
            errors.errEmail = ''
        }
        else {
            isErr = false;
            errors.errEmail = 'Email không hợp lệ'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isErr;
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onChange = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            tutorInfo: {
                ...prevState.tutorInfo,
                [name]: value,
            },
        }));
    }

    
    onSave = (e) => {
        e.preventDefault();
        let subjectIds = [];
        let {subject} = this.state.tutorInfo;
        this.state.subjects.forEach(s1 => {
            subject.forEach(s2 => {
                if(s1.subjectName === s2) {
                    subjectIds.push(s1.id);
                }
            });
        });

        let classTeachIds = [];
        let {classTeach} = this.state.tutorInfo;
        this.state.classTeaches.forEach(s1 => {
            classTeach.forEach(s2 => {
                if(s1.classTeachName === s2) {
                    classTeachIds.push(s1.id);
                }
            });
        });

        let districtIds = [];
        let {district} = this.state.tutorInfo;
        this.state.districts.forEach(s1 => {
            district.forEach(s2 => {
                if(s1.districtName === s2) {
                    districtIds.push(s1.id);
                }
            });
        });
        var { history } = this.props;
        var role = this.state.role;

        var dataUser = {
            idUser: this.state.idUser,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            email: this.state.email,
            password: this.state.phone,
            role: this.state.role
        }

        if (role !== 'TUTOR') {
            this.props.onAddUser(dataUser, history);
        } else if (role === 'TUTOR') {
            var dataTutor = {
                gender: this.state.gender,
                yearOfBirth: this.state.yearOfBirth,
                major: this.state.major,
                college: this.state.college,
                graduationYear: this.state.graduationYear,
                level: this.state.level,
                subject: subjectIds,
                classTeach: classTeachIds,
                district: districtIds,
                salaryPerHour: this.state.salaryPerHour,
                moreInfo: this.state.moreInfo
            }
            console.log(dataTutor)
            callApi('auth/addUser', "POST", dataUser).then(res => {
                if (res.status === 200 && res.data.success) {
                    let id = res.data.result.id;
                    console.log(id);
                    this.props.onAddTutor(id, dataTutor, history);
                }
            })
        }

    }
    render() {
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Thêm user</li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3>Thêm thông tin user</h3>
                                    <form onSubmit={this.onSave}>
                                        <div className="form-group">
                                            <label>Họ và tên</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                                required
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Số điện thoại</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={this.handleChange}
                                                onBlur={this.validatePhone}
                                            />
                                            {(this.state.errPhone.length > 0) ? <p className="form-warning">{this.state.errPhone}</p> : ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Địa chỉ</label>
                                            <input
                                                className="form-control"
                                                name="address"
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onBlur={this.validateEmail}
                                                onChange={this.handleChange}
                                            />
                                            {(this.state.errEmail.length > 0) ? <p className="form-warning">{this.state.errEmail}</p> : ''}
                                        </div>
                                        <p>Password được đặt mặc định là số điện thoại</p>
                                        {/* phân quyền */}
                                        <p className="form-check-inline">Phân quyền: </p>
                                        <div className="form-check-inline">
                                            <label className="form-check-label" htmlFor="radio1">
                                                <input type="radio"
                                                    className="form-check-input"
                                                    id="radio1" name="role"
                                                    value="ADMIN" defaultChecked
                                                    onChange={this.handleChange}
                                                />ADMIN
                                            </label>
                                        </div>
                                        <div className="form-check-inline">
                                            <label className="form-check-label" htmlFor="radio2">
                                                <input type="radio"
                                                    className="form-check-input"
                                                    id="radio2" name="role"
                                                    value="PARENT"
                                                    onChange={this.handleChange}
                                                />PHỤ HUYNH
                                            </label>
                                        </div>
                                        <div className="form-check-inline">
                                            <label className="form-check-label" htmlFor="radio3">
                                                <input type="radio"
                                                    className="form-check-input"
                                                    id="radio3" name="role"
                                                    value="TUTOR"
                                                    onChange={this.handleChange}
                                                />GIA SƯ
                                            </label>
                                        </div>
                                        {this.displayFormTutor()}
                                        <div className="row">
                                            <div className="col-6">
                                                <Link to="/user-list" className="btn btn-secondary btn-block">
                                                    HỦY
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-success btn-block">LƯU LẠI</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    displayFormTutor() {
        if (this.state.role === 'TUTOR') {
            return this.renderTutor();
        }
        return null;
    }
    renderTutor() {
        return (
            <div>
                <hr />
                <h3>Tạo hồ sơ gia sư</h3>
                <div className="row">
                    <div className="col-4">
                        <p >Giới tính: </p>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input type="radio"
                                    className="form-check-input"
                                    name="gender" defaultChecked
                                    onChange={this.handleChange}
                                    value="Nam"
                                />Nam
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value="Nữ"
                                />Nữ
                            </label>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group-inline">
                            <label>Năm sinh</label>
                            <input type="text"
                                className="form-control"
                                name="yearOfBirth"
                                onChange={this.handleChange}
                                value={this.state.yearOfBirth}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Hiện là</label>
                            <select required
                                className="form-control"
                                name="classTeach"
                                value={this.state.classTeach}
                                onChange={this.handleChange}>
                                <option>Sinh viên</option>
                                <option>Giáo viên</option>
                                <option>Cử nhân</option>
                                <option>Thạc sĩ</option>
                                <option>Không yêu cầu</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Trường</label>
                    <input type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        name="college"
                        value={this.state.college}
                        required
                    />

                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label htmlFor="phonenumber">Chuyên ngành</label>
                            <input type="text"
                                className="form-control"
                                name="major"
                                onChange={this.handleChange}
                                value={this.state.major}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="password">Năm tốt nghiệp</label>
                            <input type="text"
                                className="form-control"
                                name="graduationYear"
                                onChange={this.handleChange}
                                value={this.state.graduationYear}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Môn dạy</label>
                            <Select
                                fullWidth
                                labelId="demo-mutiple-checkbox-outlined-label"
                                id="demo-mutiple-checkbox-outlined"
                                multiple
                                label="Môn học"
                                onChange={this.onChange}
                                input={<Input />}
                                name="subject"
                                value={this.state.tutorInfo.subject}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {this.state.subjects.map((subject) => (
                                    <MenuItem key={subject.subjectName} value={subject.subjectName}>
                                        <Checkbox checked={this.state.tutorInfo.subject.indexOf(subject.subjectName) > -1} />
                                        <ListItemText primary={subject.subjectName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Lớp dạy</label>
                            <Select
                                fullWidth
                                labelId="demo-mutiple-checkbox-outlined-label"
                                id="demo-mutiple-checkbox-outlined"
                                multiple
                                label="Lớp dạy"
                                onChange={this.onChange}
                                input={<Input />}
                                name="classTeach"
                                value={this.state.tutorInfo.classTeach}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {this.state.classTeaches.map((classTeach) => (
                                    <MenuItem key={classTeach.id} value={classTeach.classTeachName}>
                                        <Checkbox checked={this.state.tutorInfo.classTeach.indexOf(classTeach.classTeachName) > -1} />
                                        <ListItemText primary={classTeach.classTeachName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Quận / Huyện</label>
                            <Select
                                fullWidth
                                labelId="demo-mutiple-checkbox-outlined-label"
                                id="demo-mutiple-checkbox-outlined"
                                multiple
                                label="Quận dạy"
                                onChange={this.onChange}
                                input={<Input />}
                                name="district"
                                value={this.state.tutorInfo.district}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {this.state.districts.map((district) => (
                                    <MenuItem key={district.id} value={district.districtName}>
                                        <Checkbox checked={this.state.tutorInfo.district.indexOf(district.districtName) > -1} />
                                        <ListItemText primary={district.districtName} />
                                    </MenuItem>
                                ))}
                            </Select>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Lương yêu cầu</label>
                            <input
                                className="form-control"
                                name="salaryPerHour"
                                value={this.state.salaryPerHour}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="form-group">
                            <label>Thông tin thêm</label>
                            <input
                                className="form-control"
                                name="moreInfo"
                                value={this.state.moreInfo}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddUser: (user, history) => {
            dispatch(actAddUserRequest(user, history));
        },
        onAddTutor: (id, dataTutor, history) => {
            dispatch(actAddTutorRequest(id, dataTutor, history));
        }

    }
}

export default connect(null, mapDispatchToProps)(UserActionPage);