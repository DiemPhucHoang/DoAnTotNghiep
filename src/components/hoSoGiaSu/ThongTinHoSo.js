import React, { Component } from 'react';
import {
    Grid, Paper, Button, AppBar, Toolbar,
    Typography, TextField, MenuItem, FormControl, FormGroup
} from '@material-ui/core';
import FreeTimeArea from "./FreeTimeArea";
import CustomCheckBox from "../commons/items/checkbox";

class ThongTinHoSo extends Component {

    handleClickButtonFreeTime = (id, name, value) => {
        this.props.onChangeFreeTime(id, name, value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmitTutor();

    }

    onChangeInfoTutor = (event) => {
        let { name, value } = event.target;
        this.props.onChangeInfoTutor(name, value);

    }

    onChangeSubject = (name, checked) => {
        this.props.onHandleClickSubject(name, checked);
    }

    onChangeClassTeach = (name, checked) => {
        this.props.onHandleClickClassTeach(name, checked);
    }

    onChangeDistrict = (name, checked) => {
        this.props.onHandleClickDistrict(name, checked);
    }

    renderSubjectArea = () => {
        const { subjects } = this.props;
        const hasSubjects = subjects && subjects.length > 0;
        const subjectArea = hasSubjects && subjects.map((subject) => (
            <CustomCheckBox key={subject.id} object={subject} onChange={this.onChangeSubject} itemName="subjectName"/>
        ));
        return subjectArea ? subjectArea : <> </>;
    }

    renderClassTeachArea = () => {
        const { classTeaches} = this.props;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
        const classTeachArea = hasClassTeaches && classTeaches.map((classTeach) => (
            <CustomCheckBox key={classTeach.id} object={classTeach} onChange={this.onChangeClassTeach} itemName="classTeachName"/>
        ));
        return classTeachArea ? classTeachArea: <> </>;
    }
    
    renderDistrictArea = () => {
        const { districts} = this.props;
        const hasDistricts = districts && districts.length > 0;
        const districtArea = hasDistricts && districts.map((district) => (
            <CustomCheckBox key={district.id} object={district} onChange={this.onChangeDistrict} itemName="districtName"/>
        ));
        return districtArea ? districtArea : <> </>;
    }

    renderFreeTimeArea = () => {
        const { lstFreeTime } = this.props;
        const hasLstFreeTime = lstFreeTime && lstFreeTime.length > 0;
        const freeTimeArea = hasLstFreeTime && lstFreeTime.map((freeTime) => {
            return <div key={freeTime.id} >
                <FreeTimeArea freeTime={freeTime} onChangeFreeTime={this.handleClickButtonFreeTime} />
            </div>
        });
        return freeTimeArea ? freeTimeArea : <> </>
    }

    cancelUpdate = () => {
        this.props.cancelUpdate();
    }

    render() {
        const { tutor } = this.props;
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
                    <form onSubmit={this.handleSubmit} style={{ padding: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Trường"
                                    name="college"
                                    value={tutor?.college}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Ngành"
                                    name="major"
                                    value={tutor?.major}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Năm tốt nghiệp"
                                    type="number"
                                    name="graduationYear"
                                    value={tutor?.graduationYear}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    name="level"
                                    value={tutor?.level}
                                    label="Hiện là"
                                    fullWidth
                                    size="small"
                                    required
                                    onChange={this.onChangeInfoTutor}
                                >
                                    <MenuItem key="Giáo viên" value="Giáo viên">
                                        Giáo viên
                                        </MenuItem>
                                    <MenuItem key="Sinh viên" value="Sinh viên">
                                        Sinh viên
                                        </MenuItem>
                                    <MenuItem key="Thạc sỹ" value="Thạc sỹ">
                                        Thạc sỹ
                                        </MenuItem>
                                    <MenuItem key="Cử nhân" value="Cử nhân">
                                        Cử nhân
                                        </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    select
                                    label="Giới tính"
                                    fullWidth
                                    name="gender"
                                    value={tutor?.gender}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                >
                                    <MenuItem key="Nam" value="Nam">Nam</MenuItem>
                                    <MenuItem key="Nữ" value="Nữ">Nữ</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Năm sinh"
                                    type="number"
                                    name="yearOfBirth"
                                    value={tutor?.yearOfBirth}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Lương yêu cầu (giờ)"
                                    type="number"
                                    name="salaryPerHour"
                                    value={tutor?.salaryPerHour}
                                    required
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h6>MÔN DẠY *</h6>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Grid container spacing={1}>
                                            {this.renderSubjectArea()}
                                        </Grid>
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <h6>LỚP DẠY</h6>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Grid container spacing={1}>
                                            {this.renderClassTeachArea()}
                                        </Grid>
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <h6>KHU VỰC DẠY (Quận/Huyện)</h6>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <Grid container spacing={1}>
                                            {this.renderDistrictArea()}
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
                                    name="moreInfo"
                                    onChange={this.onChangeInfoTutor}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <h5>Thời gian dạy</h5>
                                <div style={{ textAlign: "center" }}>
                                    <div className="gblock-v2">
                                        <div className="body-block block-calender">
                                            {this.renderFreeTimeArea()}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <br />
                            <Grid item xs={4}></Grid>
                            <Grid item xs={3}>
                                <Button onClick={this.cancelUpdate} variant="contained" size="small">Hủy bỏ</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button type="submit" variant="contained" color="primary" size="small">Cập nhật</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        );
    }
}

export default ThongTinHoSo;