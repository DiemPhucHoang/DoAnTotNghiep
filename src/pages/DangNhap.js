import React, { Component } from 'react';
import { Grid, TextField, Typography, Button, FormControlLabel } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import {actLoginRequest} from './../actions/user';
import { connect } from 'react-redux';

class DangNhap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var { history } = this.props;
        this.props.onLogin(this.state.userInfo, history);
    }

    onHandleSignIn = (event) => {
        let {name, value} = event.target;
        console.log('name: ', name);
        this.setState((prevState) => ({
            userInfo: {
              ...prevState.userInfo,
              [name]: value,
            },
        }));
        console.log("user ", this.state.userInfo);
    }
    render() {
        return (
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
                        />
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
                        />
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
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quên mật khẩu
                                </Link>
                            </Grid>
                            <Grid item >
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
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