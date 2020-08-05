import React, { Component } from 'react';
import { Grid, Paper, Typography, TextField, MenuItem, Button } from '@material-ui/core';

class FormDangKyNhanLop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerInfo : {
                dateReceive: this.getCurrentDay()
            }
        }
    }

    getCurrentDay = () => {
        let m = new Date();
        let dayConvert = m.getUTCFullYear() + "-" +
        ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + m.getUTCDate()).slice(-2);
        return dayConvert;
    }

    handleRegisterClass = (e) => {
        e.preventDefault();
        this.props.onRegisterClass(this.state.registerInfo);

    }
    handleChange = (event) => {
        let { name, value } = event.target;
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
                                    fullWidth
                                    defaultValue={this.state.registerInfo.dateReceive}
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