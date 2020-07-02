import React, { Component } from 'react';
import { Grid, Paper, Typography, TextField, MenuItem, Button } from '@material-ui/core';

class FormDangKyNhanLop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerInfo : {}
        }
    }

    handleRegisterClass = (e) => {
        e.preventDefault();
        this.props.onRegisterClass(this.state.registerInfo);

    }
    handleChange = (event) => {
        let { name, value } = event.target;
        console.log('name, value: ', name, value);
        this.setState((prevState) => ({
            registerInfo: {
                ...prevState.registerInfo,
                [name]: value
            }
        }));
    }
    
    render() {
        return (
            <Grid item xs={4} style={{ marginTop: "20px" }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h6" style={{ color: "#3F51B5" }}>
                        Đăng ký nhận lớp
                    </Typography>
                    <br />
                    <form onSubmit={this.handleRegisterClass}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Ngày nhận lớp"
                                    type="date"
                                    name="dateReceive"
                                    required
                                    defaultValue="2020-07-02"
                                    onChange={this.handleChange}
                                    className="date-receive"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Hình thức thanh toán"
                                    name="payment"
                                    required
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem key="1" value="Chuyển khoản">
                                        Chuyển khoản
                                    </MenuItem>
                                    <MenuItem key="2" value="Đến trung tâm">
                                        Đến trung tâm
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Yêu cầu thêm (nếu có)"
                                    name="moreRequire"
                                    placeholder="Placeholder"
                                    multiline
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button label="Submit" type="submit" variant="contained" color="secondary">
                                    Đăng ký
                				</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        );
    }
}

export default FormDangKyNhanLop;