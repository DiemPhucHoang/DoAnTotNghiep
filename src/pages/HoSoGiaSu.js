import React, { Component } from 'react';
import { Grid, Paper, Button, AppBar, Toolbar, Typography, TextField, MenuItem, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup } from '@material-ui/core';

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
                                            HỒ SƠ GIA SƯ
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <form style={{ padding: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Trường"
                                                value="Đại học sư phạm kỹ thuật TPHCM"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Ngành"
                                                value="Công nghệ thông tin"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Năm tốt nghiệp"
                                                value="2020"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Hiện là"
                                                placeholder="Trình độ"
                                                value="Sinh viên"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                select
                                                label="Giới tính"
                                                fullWidth
                                            >
                                                <MenuItem key="Nam" value="Nam">Nam</MenuItem>
                                                <MenuItem key="Nữ" value="Nữ">Nữ</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Năm sinh"
                                                value="1998"
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField id="standard-basic"
                                                fullWidth label="Lương yêu cầu (buổi)"
                                                value="200.000 vnđ"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h6>MÔN DẠY</h6>
                                            <FormControl component="fieldset">
                                                <FormGroup>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Toán"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Vật lý"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Hóa học"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Ngữ văn"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Tiếng Anh"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Sinh học"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Báo bài"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lịch sử"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Địa lý"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Đàn nhạc"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Tin học"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Vẽ"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h6>LỚP DẠY</h6>
                                            <FormControl component="fieldset">
                                                <FormGroup>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 1"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 2"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 3"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 4"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 5"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 6"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 7"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 8"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 9"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 10"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 11"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp 12"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Ôn đại học"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp năng khiếu"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Lớp khác"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h6>KHU VỰC DẠY (Quận)</h6>
                                            <FormControl component="fieldset">
                                                <FormGroup>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 1"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 2"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 3"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 4"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 5"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 6"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 7"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 8"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                          <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 9"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 10"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 11"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Quận 12"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Q. Thủ Đức"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Q. Bình Thạnh"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Q. Gò Vấp"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Q. Tân Bình"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox onChange={this.onChange} />}
                                                                label="Q. Tân Phú"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="standard-multiline-static"
                                                fullWidth label="Thông tin thêm"
                                                multiline
                                                rowsMax={4}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <h5>Thời gian dạy</h5>
                                            <div style={{ textAlign: "center" }}>
                                                <div className="gblock-v2">
                                                    <div className="body-block block-calender">
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 2</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 3</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 4</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small" color="secondary">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 5</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 6</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" color="secondary" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Thứ 7</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" color="secondary" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" color="secondary" size="small">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="row-calendar">
                                                            <p className="mr-30">Chủ nhật</p>
                                                            <ul>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Sáng</Button>
                                                                </li>
                                                                <li className="calendar-normal">
                                                                    <Button variant="contained" size="small">Chiều</Button>
                                                                </li>
                                                                <li className="calendar-active">
                                                                    <Button variant="contained" size="small" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <div style={{ textAlign: 'center', padding: '10px' }}>
                                        <Button variant="contained" color="primary" size="small">Cập nhật hồ sơ</Button>
                                    </div>
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