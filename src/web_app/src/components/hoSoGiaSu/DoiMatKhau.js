import React, { Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import callApi from '../../utils/apiCaller';
import { notification } from "antd";
import "antd/dist/antd.css";
import {validateConfirmPassword, validatePassword} from '../../constants/validate';

class DoiMatKhau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordInfo: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                errPassword: '',
                errConfirmPassword: ''
            },
            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCloseChangePassword();
        let {confirmPassword, newPassword} = this.state.passwordInfo;
        if(newPassword !== confirmPassword) {
            notification.error({
                message: "Failed",
                description: "Nhập lại mật khẩu không đúng!"
            });
            return;
        }
        callApi('auth', "PATCH", this.state.passwordInfo).then(res => {
            if (res.status === 200 && res.data.success) {
                notification.success({
                    message: "Success",
                    description: "Đổi mật khẩu thành công!"
                });
                this.props.history.push('/login');
            } else {
                notification.error({
                    message: "Failed",
                    description: "Đổi mật khẩu không thành công. Vui lòng kiểm tra lại thông tin!"
                });
            }
        }).catch(error => {
            console.log(error);
        });
       
    }
    onChange = (e) => {
        let {name, value} = e.target;
        this.setState((prevState) => ({
            passwordInfo: {
                ...prevState.passwordInfo,
                [name]: value
            }
        }));
    }

    validateField = (valueFirst, valueSecond, errName) => {
        if(errName === 'errPassword') {
            let err = validatePassword(valueFirst);
            this.setState({
                errPassword: err
            })
        }  
        if(errName === 'errConfirmPassword') {
            let err = validateConfirmPassword(valueFirst, valueSecond);
            this.setState({
                errConfirmPassword: err
            })
        }  
    }

    render() {
        return (
            <Dialog
                open={this.props.openChangePassword}
                onClose={this.props.onCloseChangePassword}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Đổi mật khẩu
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3} style={{ padding: "20px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="password"
                                        name="oldPassword"
                                        label="Mật khẩu cũ"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="password"
                                        name="newPassword"
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                        onBlur={() => this.validateField(this.state.passwordInfo.newPassword, null, 'errPassword')}
                                    />
                                    {(this.state.errPassword !=='') ? <p style={{color: "red"}}>{this.state.errPassword}</p> : ''}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        id="standard-select-currency"
                                        type="password"
                                        name="confirmPassword"
                                        label="Nhập lại mật khẩu mới"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                        onBlur={() => this.validateField(this.state.passwordInfo.newPassword, this.state.passwordInfo.confirmPassword, 'errConfirmPassword')}
                                    />
                                    {(this.state.errConfirmPassword !=='') ? <p style={{color: "red"}}>{this.state.errConfirmPassword}</p> : ''}
                                </Grid>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button variant="contained" onClick={this.props.onCloseChangePassword}>
                                Cancel
                                </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Save
                                </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog >
        );
    }
}

export default DoiMatKhau;