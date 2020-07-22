import React, { Component } from 'react';
import {
    Grid, TextField, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText
} from '@material-ui/core';
import { notification } from "antd";
import "antd/dist/antd.css";
import callApi from '../utils/apiCaller';

class QuenMatKhau extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        callApi(`auth/forgot-password?email=${this.state.email}`, "POST", null).then(res => {
            if (res.status === 200 && res.data.success) {
                this.props.closeForgotPassword();
                notification.success({
                    message: "Success",
                    description: "Vui lòng kiểm tra email để đổi mật khẩu!"
                });
            }
        }).catch(error => {
            console.log("Error: ", error);
        });
    }

    onChange = (e) => {
        let { value } = e.target;
        this.setState({ email: value });
    }

    render() {
        return (
            <Dialog
                open={this.props.showForgotPassword}
                onClose={this.props.closeForgotPassword}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Quên mật khẩu?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng cung cấp email đăng nhập để lấy lại mật khẩu.
                    </DialogContentText>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3} style={{ padding: "20px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        type="email"
                                        name="email"
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button variant="contained" onClick={this.props.closeForgotPassword}>
                                Cancel
                                </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Gửi
                                </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog >
        );
    }
}

export default QuenMatKhau;