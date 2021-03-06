import React, { Component } from 'react';
import { Container, TextField, Typography, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { notification } from "antd";
import "antd/dist/antd.css";
import callApi from '../utils/apiCaller';
import { validatePassword, validateConfirmPassword } from '../constants/validate';

class DoiMatKhau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            errPassword: '',
            errConfirmPassword: ''
        }
    }

    onChangePassword = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleChangePassword = (e) => {
        e.preventDefault();
        let { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            notification.error({
                message: "Failed",
                description: "Hai mật khẩu không khớp!"
            });
            return;
        }
        let data = {
            password: this.state.password,
            token: this.props.match.params.token
        };

        callApi('auth/change-password-forgot', "PATCH", data).then(res => {
            if (res.status === 200 && res.data.success) {
                this.props.history.push("/login");
                notification.success({
                    message: "Success",
                    description: "Đổi mật khẩu thành công!"
                });
            } else {
                notification.error({
                    message: "Failed",
                    description: "Bạn đã sử dụng link này đổi mật khẩu!"
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    validateField = (valueFirst, valueSecond, errName) => {
        if (errName === 'errPassword') {
            let err = validatePassword(valueFirst);
            this.setState({
                errPassword: err
            })
        }
        if (errName === 'errConfirmPassword') {
            let err = validateConfirmPassword(valueFirst, valueSecond);
            this.setState({
                errConfirmPassword: err
            })
        }
    }

    render() {
        return (
            <Container maxWidth="xs">
                <div className="paper-login">
                    <Avatar style={{ backgroundColor: "#dc004e", marginLeft: "170px" }}>
                        <VpnKeyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                        Đổi mật khẩu
                    </Typography>
                    <form className="form-login" onSubmit={this.handleChangePassword}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={this.onChangePassword}
                            onBlur={() => this.validateField(this.state.password, null, 'errPassword')}
                        />
                        {(this.state.errPassword !== '') ? <p style={{ color: "red" }}>{this.state.errPassword}</p> : ''}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            onChange={this.onChangePassword}
                            onBlur={() => this.validateField(this.state.password, this.state.confirmPassword, 'errConfirmPassword')}
                        />
                        {(this.state.errConfirmPassword !== '') ? <p style={{ color: "red" }}>{this.state.errConfirmPassword}</p> : ''}
                        <br /><br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Đổi mật khẩu
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default DoiMatKhau;