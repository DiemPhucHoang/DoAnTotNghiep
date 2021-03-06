import React, { Component } from 'react';
import { Card, Grid, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import callApi from './../utils/apiCaller';
import { actLoginRequest } from './../actions/user';
import { connect } from 'react-redux';
import { notification } from "antd";
import "antd/dist/antd.css";
import Footer from '../components/Footer';
import Header from '../components/Header';
import { validateEmail, validatePhone, validatePassword } from '../constants/validate';

class DangKyLamGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            name: '',
            phone: '',
            password: '',
            email: '',
            address: '',
            errPhone: '',
            errEmail: '',
            errPassword: ''
        }
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        let { history } = this.props;
        let userInfo = {
            role: "ROLE_TUTOR",
            name: this.state.name,
            phone: this.state.phone,
            password: this.state.password,
            email: this.state.email,
            address: this.state.address
        }
        let loginInfo = {
            phone: this.state.phone,
            password: this.state.password,
        }
        callApi('auth/signup', 'POST', userInfo).then(res => {
            if (res.status === 201 && res.data.success) {
                let isTutor = true;
                this.props.onLogin(loginInfo, history, isTutor);
            }
        }).catch(error => {
            notification.error({
                message: "Failed",
                description:
                    "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin!"
            });
        });

    }

    handleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    };

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    validateField = (value, errName) => {
        if(errName ==='errPhone') {
            let err = validatePhone(value);
            this.setState({
                errPhone: err
            })
        }
        if(errName ==='errEmail') {
            let err = validateEmail(value);
            this.setState({
                errEmail: err
            })
        } 
        if (errName === 'errPassword') {
            let err = validatePassword(value);
            this.setState({
                errPassword: err
            })
        }       
    }

    render() {
        var { password, showPassword } = this.state;
        return (
            <div>
                <Header />
                <div className="bg-color">
                    <div className="p-5 mx-5">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Card variant="elevation" elevation={3} style={{ padding: '35px' }}>
                                    <h4 style={{ textAlign: "center" }}>ĐĂNG KÝ LÀM GIA SƯ</h4>
                                    <form onSubmit={this.onHandleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="name"
                                                    fullWidth
                                                    label="Họ và tên"
                                                    required
                                                    name="name"
                                                    onChange={this.handleChange} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    id="phone"
                                                    fullWidth
                                                    label="Số điện thoại"
                                                    type="number"
                                                    name="phone"
                                                    required
                                                    onBlur={() => this.validateField(this.state.phone, 'errPhone')}
                                                    onChange={this.handleChange} />
                                                {(this.state.errPhone !=='') ? <p style={{color: "red"}}>{this.state.errPhone}</p> : ''}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl>
                                                    <InputLabel
                                                        fullWidth
                                                        htmlFor="standard-adornment-password"
                                                    >
                                                        Mật khẩu
                                                    </InputLabel>
                                                    <Input
                                                        fullWidth={true}
                                                        required
                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={password}
                                                        onChange={this.handleChange}
                                                        onBlur={() => this.validateField(this.state.password, 'errPassword')}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={this.handleClickShowPassword}
                                                                    onMouseDown={this.handleMouseDownPassword}
                                                                >
                                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {(this.state.errPassword !== '') ? <p style={{ color: "red" }}>{this.state.errPassword}</p> : ''}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="address"
                                                    fullWidth
                                                    label="Địa chỉ"
                                                    required
                                                    name="address"
                                                    onChange={this.handleChange} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="email"
                                                    fullWidth
                                                    label="Email"
                                                    name="email"
                                                    onBlur={() => this.validateField(this.state.email, 'errEmail')}
                                                    onChange={this.handleChange} />
                                                {(this.state.errEmail !== '') ? <p style={{color: "red"}}>{this.state.errEmail}</p> : ''}
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <div style={{ textAlign: "center" }}>
                                            <Button type="submit" variant="contained" color="secondary" >
                                                Đăng ký
                                        </Button>
                                        </div>
                                    </form>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <img alt="signup" style={{ width: "90%", marginTop: "50px", float: "right" }} src="image/register.png" />
                            </Grid>
                        </Grid>

                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (userInfo, history, isTutor) => {
            dispatch(actLoginRequest(userInfo, history, isTutor));
        }
    };
};
export default connect(null, mapDispatchToProps)(DangKyLamGiaSu);