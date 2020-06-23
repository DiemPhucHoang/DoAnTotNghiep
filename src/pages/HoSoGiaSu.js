import React, { Component } from 'react';
import { Grid, Paper, Button, AppBar, Toolbar, Typography, TextField } from '@material-ui/core';

class HoSoGiaSu extends Component {
    render() {
        return (
            <div className="bg-color">
                <div className="p-5 mx-5">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Paper>
                                <div style={{ textAlign: 'center', padding: '15px' }}>
                                    <img src="image/avata.jpg" class="rounded-circle" style={{ width: '50%' }} />
                                    <br /><br />
                                    <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                </div>
                                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                    <ul className='list-group list-group-unbordered'>
                                        <li className='list-group-item'>
                                            <p> <b>Số điện thoại: </b>0987654321</p>
                                        </li>
                                        <li className='list-group-item'>
                                            <p> <b>Địa chỉ: </b>01-Võ Văn Ngân-Thủ Đức-TPHCM</p>
                                        </li>
                                        <li className='list-group-item'>
                                            <p><b>Email: </b>phuc@gmail.com</p>
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ textAlign: 'center', padding: '10px' }}>
                                    <Button variant="contained" color="secondary" size="small">Đổi mật khẩu</Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <Typography variant="h6" color="inherit">
                                            THÔNG TIN CHI TIẾT
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <form style={{ padding: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField id="standard-basic" fullWidth label="Họ và tên" />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic" fullWidth label="Số điện thoại" />
                                        </Grid>
                                    </Grid>    
                                </form>
                            </Paper>
                        </Grid>
                        </Grid>
                </div>
                </div>
        );
    }
}

export default HoSoGiaSu;