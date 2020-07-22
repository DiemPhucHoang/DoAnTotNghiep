import React, { Component } from 'react';
import {
    CardContent, Button, Grid, TextField, MenuItem
} from '@material-ui/core';
import { actCreateClassesRequest } from './../../actions/classes';
import { connect } from "react-redux";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class DangKyChonGiaSu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classInfo: {
                subject: []
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let idArr = [];
        this.props.tutorItem.forEach(tutor => {
            idArr.push(tutor?.tutorInfoVO?.id);
        });
        this.setState((prevState) => ({
            classInfo: {
                ...prevState.classInfo,
                idTutors: idArr
            },
        }), () => {
            let { history } = this.props;
            let hasChooseTutors = true;
            let classInfo = {
                classTeach: this.state.classInfo.classTeach,
                subject: this.state.classInfo.subject.join(", "),
                timeTeach: this.state.classInfo.timeTeach,
                address: this.state.classInfo.address,
                district: this.state.classInfo.district,
                tuitionFee: this.state.classInfo.tuitionFee,
                genderRequirement: this.state.classInfo.genderRequirement,
                levelRequirement: this.state.classInfo.levelRequirement,
                name: this.state.classInfo.name,
                phone: this.state.classInfo.phone,
                email: this.state.classInfo.email,
                idTutors: this.state.classInfo.idTutors
              };
            this.props.onCreateClass(classInfo, hasChooseTutors, history);
        })

    }

    onHandleChooseTutor = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            classInfo: {
                ...prevState.classInfo,
                [name]: value,
            },
        }));
    }

    render() {
        const { subjects, classTeaches, districts } = this.props;
        const hasSubjects = subjects && subjects.length > 0;
        const hasDistricts = districts && districts.length > 0;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
        return (
            <CardContent>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} style={{ padding: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth required>
                                    <InputLabel id="demo-mutiple-checkbox-outlined-label">Môn học</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-outlined-label"
                                        id="demo-mutiple-checkbox-outlined"
                                        multiple
                                        label="Môn học"
                                        onChange={this.onHandleChooseTutor}
                                        input={<Input />}
                                        name="subject"
                                        variant="outlined"
                                        value={this.state.classInfo.subject}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {hasSubjects && subjects.map((subject) => (
                                            <MenuItem key={subject.subjectName} value={subject.subjectName}>
                                                <Checkbox checked={this.state.classInfo.subject.indexOf(subject.subjectName) > -1} />
                                                <ListItemText primary={subject.subjectName} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-select-currency"
                                    name="classTeach"
                                    select
                                    label="Lớp dạy"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                >
                                    {hasClassTeaches && classTeaches.map((option) => (
                                        <MenuItem key={option.classTeachName} value={option.classTeachName}>
                                            {option.classTeachName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    name="levelRequirement"
                                    label="Chọn trình độ gia sư"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
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
                                    <MenuItem key="Cử nhân sư phạm" value="Cử nhân sư phạm">
                                        Cử nhân sư phạm
                                        </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    name="genderRequirement"
                                    label="Chọn giới tính gia sư"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={this.onHandleChooseTutor}
                                >
                                    <MenuItem key="Nam" value="Nam">
                                        Nam
                                        </MenuItem>
                                    <MenuItem key="Nữ" value="Nữ">
                                        Nữ
                                        </MenuItem>
                                    <MenuItem key="Không yêu cầu" value="Không yêu cầu">
                                        Không yêu cầu
                                        </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="standard-select-currency"
                                    name="tuitionFee"
                                    label="Học phí dự kiến (VNĐ/tháng)"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    name="timeTeach"
                                    id="standard-select-currency"
                                    label="Thời gian dạy"
                                    variant="outlined"
                                    size="small"
                                    placeholder="T3-T5-T7 17h30-19h"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-select-currency"
                                    name="district"
                                    select
                                    label="Chọn quận"
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    onChange={this.onHandleChooseTutor}
                                >
                                    {hasDistricts && districts.map((option) => (
                                        <MenuItem key={option.districtName} value={option.districtName}>
                                            {option.districtName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="standard-select-currency"
                                    name="address"
                                    label="Địa chỉ cụ thể"
                                    placeholder="Số nhà, tên đường, tên phường"
                                    variant="outlined"
                                    required
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="standard-select-currency"
                                    name="name"
                                    label="Họ tên của phụ huynh"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="standard-select-currency"
                                    name="phone"
                                    label="Số điện thoại"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="standard-select-currency"
                                    name="email"
                                    label="Email (nếu có)"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" style={{ float: 'right' }} color="secondary" type="submit">Đăng ký</Button>
                </form>
            </CardContent>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateClass: (classInfo, hasChooseTutors, history) => {
            dispatch(actCreateClassesRequest(classInfo, hasChooseTutors, history));
        }
    };
};

export default connect(null, mapDispatchToProps)(DangKyChonGiaSu);