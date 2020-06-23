import React, { Component } from 'react';
import { Card, Grid, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class DangKyLamGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false
        }
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
    render() {
        var { password, showPassword } = this.state;
        return (
            <div className="bg-color">
                <div className="p-5 mx-5">
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Card variant="elevation" elevation={3} style={{ padding: '35px' }}>
                                <h4 style={{ textAlign: "center" }}>ĐĂNG KÝ LÀM GIA SƯ</h4>
                                <form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField id="standard-basic" fullWidth label="Họ và tên" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic" fullWidth label="Số điện thoại" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl>
                                                <InputLabel fullWidth htmlFor="standard-adornment-password">Mật khẩu</InputLabel>
                                                <Input
                                                    fullWidth={true}
                                                    id="standard-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={password}
                                                    onChange={this.handleChange}
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
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField id="standard-basic" fullWidth label="Địa chỉ" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField id="standard-basic" fullWidth label="Email" />
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    <div style={{textAlign: "center"}}>
                                        <Button variant="contained" color="secondary" >
                                            Đăng ký
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <img style={{ width: "90%", marginTop: "50px", float: "right" }} src="image/register.png"/>
                        </Grid>

                    </Grid>

                </div>
            </div>

        );
    }
}

export default DangKyLamGiaSu;