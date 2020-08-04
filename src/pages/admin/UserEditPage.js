import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actUpdateUserRequest, actGetUserRequest } from '../../actions/user';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';

class UserEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // idUser: null,
            // name: '',
            // phone: '',
            // address: '',
            // email: '',
            // role: '',
            errPhone: '',
            errAddress: '',
            errEmail: '',
            errPassword: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.users) {
            var { users } = nextProps;
            this.setState({
                id: users.id,
                name: users.name,
                phone: users.phone,
                address: users.address,
                email: users.email,
                role: users.role,
                password: users.password
            });

        }
    }
    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.onEditUser(id);
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    onSave = (e) => {
        e.preventDefault();
        var { history } = this.props;
        var dataUser = {
            id: this.state.id,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            email: this.state.email,
            role: this.state.role,
            password: this.state.password
        }
        if (dataUser.id) {        
            this.props.onUpdateUser(dataUser, history);
        }
    }

    validatePassword = () => {
        let isErr = false;
        let errors = {};
        // password
        const regexPass = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}$/;
        if (regexPass.exec(this.state.password) !== null) {
            isErr = false;
            errors.errPassword = ''
        }
        else {
            isErr = false;
            errors.errPassword = 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và có ít nhất 6 ký tự'
        }

        this.setState({
            ...this.state,
            ...errors
        })
        return isErr;
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
                                <li className="breadcrumb-item active">Xem user</li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h3>Thông tin user</h3>
                                    <form>
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
                                                type="text"
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
                                                type="text"
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
                                                onChange={this.handleChange}
                                                onBlur={this.validateEmail}
                                            />
                                            {(this.state.errEmail.length > 0) ? <p className="form-warning">{this.state.errEmail}</p> : ''}
                                        </div>
                                        <div className="form-group">
                                            <label>Phân quyền: <b style={{color: "red"}}>{this.state.role}</b></label>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <Link to="/admin/quan-ly-user" className="btn btn-secondary btn-block">
                                                    HỦY
                                        </Link>
                                            </div>
                                            <div className="col-6">
                                                <button onClick={this.onSave} className="btn btn-success btn-block">LƯU LẠI</button>
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


}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEditUser: (id) => {
            dispatch(actGetUserRequest(id));
        },
        onUpdateUser: (user, history) => {
            dispatch(actUpdateUserRequest(user, history));
        }
    }
}
const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage);