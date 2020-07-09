import React, { Component } from 'react';
import { Grid, Paper, Button, AppBar, Toolbar, Typography, TextField, MenuItem, FormControl, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';

class ThongTinHoSo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorInfo: {}
        }
    }

    handleClickButtonFreeTime = (e, id, name, value) => {
        this.props.onChangeFreeTime(id, name, !value);
    }

    onHandleInfoTutor = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            tutorInfo: {
                ...prevState.tutorInfo,
                [name]: value,
            },
        }));
    }

    render() {
        console.log('freeTime: ', this.props.lstFreeTime);
        const freeTimeArea = this.props.lstFreeTime?.map((freeTime, index) => {
            return <div key={freeTime.id} className="row-calendar">
                <p className="mr-30">{freeTime.dayName}</p>
                <ul>
                    <li className="calendar-normal">
                        <Button variant="contained" size="small" name="morning"
                            color={freeTime.morning ? "secondary" : "default"}
                            onClick={(e) => this.handleClickButtonFreeTime(e, freeTime.id, "morning", freeTime.morning)}
                        >
                            Sáng</Button>
                    </li>
                    <li className="calendar-normal">
                        <Button variant="contained" size="small" name="afternoon"
                            color={freeTime.afternoon ? "secondary" : "default"}
                            onClick={(e) => this.handleClickButtonFreeTime(e, freeTime.id, "afternoon", freeTime.afternoon)}
                        >
                            Chiều</Button>
                    </li>
                    <li className="calendar-active">
                        <Button variant="contained" size="small" name="evening"
                            color={freeTime.evening ? "secondary" : "default"}
                            onClick={(e) => this.handleClickButtonFreeTime(e, freeTime.id, "evening", freeTime.evening)}
                        >
                            &ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                    </li>
                </ul>
            </div>
        })

        return (
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
                                <TextField 
                                    id="standard-basic"
                                    fullWidth
                                    label="Trường"
                                    value="Đại học sư phạm kỹ thuật TPHCM"
                                    name="college"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    id="standard-basic"
                                    fullWidth 
                                    label="Ngành"
                                    value="Công nghệ thông tin"
                                    name="major"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    id="standard-basic"
                                    fullWidth 
                                    label="Năm tốt nghiệp"
                                    value="2020"
                                    name="graduationYear"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="standard-basic"
                                    fullWidth label="Hiện là"
                                    placeholder="Trình độ"
                                    value="Sinh viên"
                                    name="level"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Giới tính"
                                    fullWidth
                                    name="gender"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                >
                                    <MenuItem key="Nam" value="Nam">Nam</MenuItem>
                                    <MenuItem key="Nữ" value="Nữ">Nữ</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField 
                                    id="standard-basic"
                                    fullWidth 
                                    label="Năm sinh"
                                    value="1998"
                                    name="yearOfBirth"
                                    required
                                    onChange={this.onHandleInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField 
                                    id="standard-basic"
                                    fullWidth 
                                    label="Lương yêu cầu (giờ)"
                                    value="200.000 vnđ"
                                    name="salaryPerHour"
                                    required
                                    onChange={this.onHandleInfoTutor}
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
                                <h6>KHU VỰC DẠY (Quận/Huyện)</h6>
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
                                            {freeTimeArea}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <br />
                            <Grid item xs={4}></Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" size="small">Hủy bỏ</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" color="primary" size="small">Cập nhật</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>

        );
    }
}

export default ThongTinHoSo;