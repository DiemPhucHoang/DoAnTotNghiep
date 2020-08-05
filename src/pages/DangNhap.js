import React, { Component } from 'react';
import { Grid, TextField, Typography, Button, FormControlLabel } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { actLoginRequest } from './../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QuenMatKhau from './QuenMatKhau';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {validatePhone, validatePassword} from '../constants/validate';

class DangNhap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            open: false,
            errPhone:'',
            errPassword: ''
        }
    }

    showForgotPassword = () => {
        this.setState({
            open: true,
        });
    };
    onCloseForgotPassword = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var { history } = this.props;
        this.props.onLogin(this.state.userInfo, history);
    }

    onHandleSignIn = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            userInfo: {
                ...prevState.userInfo,
                [name]: value,
            },
        }));
    }

    validateField = (value, errName) => {
        if(errName === 'errPhone') {
            let err = validatePhone(value);
            this.setState({
                errPhone: err
            })
        }  
        if(errName === 'errPassword') {
            let err = validatePassword(value);
            this.setState({
                errPassword: err
            })
        }  
    }


    render() {
        return (
            <div>
                <Header />
                <Container maxWidth="xs">
                    <div className="paper-login">
                        <Avatar style={{ backgroundColor: "#dc004e", marginLeft: "170px" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                            Đăng nhập
                        </Typography>
                        <form className="form-login" onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Số điện thoại"
                                name="phone"
                                type="number"
                                onChange={this.onHandleSignIn}
                                onBlur={() => this.validateField(this.state.userInfo.phone, 'errPhone')}
                            />
                            {(this.state.errPhone !=='') ? <p style={{color: "red"}}>{this.state.errPhone}</p> : ''}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.onHandleSignIn}
                                onBlur={() => this.validateField(this.state.userInfo.password, 'errPassword')}
                            />
                            {(this.state.errPassword !=='') ? <p style={{color: "red"}}>{this.state.errPassword}</p> : ''}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Đăng nhập
                        </Button>
                            <Grid container className="pt-3">
                                <Grid item xs={6}>
                                    <Button size="small" onClick={this.showForgotPassword} variant="outlined" color="primary" >
                                        Quên mật khẩu
                                </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to='/lam-gia-su' variant="body2">
                                        {"Bạn chưa có tài khoản? Đăng ký"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <QuenMatKhau showForgotPassword={this.state.open} closeForgotPassword={this.onCloseForgotPassword} />
                </Container>
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (userInfo, history) => {
            dispatch(actLoginRequest(userInfo, history));
        }
    };
};
export default connect(null, mapDispatchToProps)(DangNhap);