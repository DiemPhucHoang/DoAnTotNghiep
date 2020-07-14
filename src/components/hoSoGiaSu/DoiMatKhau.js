import React, { Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import callApi from '../../utils/apiCaller';
import { notification } from "antd";
import "antd/dist/antd.css";

class DoiMatKhau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordInfo: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
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
                                    />
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
                                    />
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