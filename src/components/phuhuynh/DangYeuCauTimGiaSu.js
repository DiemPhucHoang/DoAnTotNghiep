import React, { Component } from "react";
import {
    Grid,
    TextField,
    MenuItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent
} from "@material-ui/core";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { actCreateClassesRequest } from './../../actions/classes';
import { connect } from "react-redux";

class DangYeuCauTimGiaSu extends Component {

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
        this.props.onCloseSubmitRequest();
        let hasChooseTutors = false;
        let { history } = this.props;
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
          };
        this.props.onCreateClass(classInfo, hasChooseTutors, history);
    }

    onChange = (event) => {
        let { name, value } = event.target;
        this.setState((prevState) => ({
            classInfo: {
                ...prevState.classInfo,
                [name]: value
            }
        }));
    }

    render() {
        const { subjects, classTeaches, districts } = this.props;
        const hasSubjects = subjects && subjects.length > 0;
        const hasDistricts = districts && districts.length > 0;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
        return (
            <Dialog
                open={this.props.submitRequest}
                onClose={this.props.onCloseSubmitRequest}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="draggable-dialog-title">
                    Đăng yêu cầu tìm gia sư
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3} style={{ padding: "20px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined" fullWidth required>
                                        <InputLabel id="demo-mutiple-checkbox-outlined-label">Môn học</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-checkbox-outlined-label"
                                            multiple
                                            label="Môn học"
                                            onChange={this.onChange}
                                            input={<Input />}
                                            name="subject"
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
                                {/* <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        name="subject"
                                        required
                                        id="standard-select-currency"
                                        label="Môn học"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    >
                                        {hasSubjects && subjects.map((option) => (
                                            <MenuItem key={option.subjectName} value={option.subjectName}>
                                                {option.subjectName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        name="classTeach"
                                        required
                                        label="Lớp dạy"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={this.onChange}
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
                                        select
                                        name="levelRequirement"
                                        label="Chọn trình độ gia sư"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={this.onChange}
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
                                        select
                                        name="genderRequirement"
                                        label="Chọn giới tính gia sư"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={this.onChange}
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
                                        name="tuitionFee"
                                        label="Học phí dự kiến (VNĐ/tháng)"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        required
                                        name="timeTeach"
                                        label="Thời gian dạy"
                                        variant="outlined"
                                        size="small"
                                        placeholder="T3-T5-T7 17h30-19h"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        label="Chọn quận"
                                        name="district"
                                        required
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={this.onChange}
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
                                        label="Địa chỉ cụ thể"
                                        name="address"
                                        required
                                        placeholder="Số nhà, tên đường, tên phường"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Họ tên của phụ huynh"
                                        name="name"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Số điện thoại"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        label="Email (nếu có)"
                                        variant="outlined"
                                        size="small"
                                        onChange={this.onChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <hr />
                        <div textalign="center">
                            <Button
                                variant="contained"
                                style={{ float: "right" }}
                                color="primary"
                                type="submit"
                            >
                                Đăng yêu cầu
                            </Button>
                            <Button
                                variant="contained"
                                style={{ float: "right", marginRight: "20px" }}
                                onClick={this.props.onCloseSubmitRequest}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog >
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

export default connect(null, mapDispatchToProps)(DangYeuCauTimGiaSu);
