import React, { Component } from 'react';
import {
    CardContent, Button, Grid, TextField, MenuItem
} from '@material-ui/core';
import { actCreateClassesRequest } from './../../actions/classes';
import { connect } from "react-redux";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { validateEmail, validatePhone, validateSalary } from '../../constants/validate';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class DangKyChonGiaSu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classInfo: {
                subject: [],
                district: "",
                classTeach: "",
                levelRequirement: "",
                genderRequirement: ""
            },
            errPhone: '',
            errEmail: '',
            valueRadio: '',
            errSalary: ''
        }
    }

    componentDidMount() {
        let { subject, district, classTeach, level, gender } = this.props.searchTutor;
        if (!(subject === undefined &&
            district === undefined &&
            classTeach === undefined &&
            level === undefined &&
            gender === undefined)
            || (subject === "" &&
                district === "" &&
                classTeach === "" &&
                level === "" &&
                gender === "")
        ) {
            this.setState({
                classInfo: {
                    subject: subject.split(","),
                    district: district,
                    classTeach: classTeach,
                    levelRequirement: level,
                    genderRequirement: gender,
                },
            })

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
                idTutors: this.state.classInfo.idTutors,
                noDay: this.state.classInfo.noDay,
                noHour: this.state.classInfo.noHour
            };
            this.props.onCreateClass(classInfo, hasChooseTutors, history);
        })

    }

    onHandleChooseTutor = (event) => {
        let { name, value } = event.target;
        if (name === "parent") {
            this.setState({
                valueRadio: value
            })
        }
        this.setState((prevState) => ({
            classInfo: {
                ...prevState.classInfo,
                [name]: value,
            },
        }));
    }

    validateField = (value, errName) => {
        if (errName === 'errPhone') {
            let err = validatePhone(value);
            this.setState({
                errPhone: err
            })
        }
        if (errName === 'errEmail') {
            let err = validateEmail(value);
            this.setState({
                errEmail: err
            })
        }
        if (errName === 'errSalary') {
            let salaryArr = [];
            this.props.tutorItem.forEach(tutor => {
                salaryArr.push(tutor?.tutorInfoVO?.salaryPerHour);
            });
            if (this.state.classInfo.noDay && this.state.classInfo.noHour) {
                let salary = this.checkSalary(salaryArr, this.state.classInfo.noDay, this.state.classInfo.noHour);
                let err = validateSalary(value, salary);
                this.setState({
                    errSalary: err
                })
            }
        }

    }

    checkSalary = (salaryTutors, noDay, noHour) => {
        let sumSalary, salary = 0;
        sumSalary = salaryTutors.reduce((a, b) => a + b, 0);
        let avgSalary = sumSalary / salaryTutors.length;
        salary = avgSalary * noDay * noHour * 4;
        return salary;
    }

    render() {
        let { valueRadio } = this.state;
        const { subjects, classTeaches, districts, searchTutor } = this.props;
        const hasSubjects = subjects && subjects.length > 0;
        const hasDistricts = districts && districts.length > 0;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
        const noDay = [1, 2, 3, 4, 5, 6, 7];
        return (
            <CardContent>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} style={{ padding: '20px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    name="district"
                                    select
                                    label="Chọn quận"
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.district}
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
                                    name="address"
                                    label="Địa chỉ cụ thể"
                                    placeholder="Số nhà, tên đường, tên phường"
                                    variant="outlined"
                                    required
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="classTeach"
                                    select
                                    label="Lớp dạy"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.classTeach}
                                >
                                    {hasClassTeaches && classTeaches.map((option) => (
                                        <MenuItem key={option.classTeachName} value={option.classTeachName}>
                                            {option.classTeachName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth required variant="outlined" size="small">
                                    <InputLabel id="demo-mutiple-checkbox-outlined-label">Môn học</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-checkbox-outlined-label"
                                        id="demo-mutiple-checkbox-outlined"
                                        multiple
                                        label="Môn học"
                                        onChange={this.onHandleChooseTutor}
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
                                    select
                                    name="levelRequirement"
                                    label="Chọn trình độ gia sư"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.levelRequirement === "" ? "Không yêu cầu" : this.state.classInfo.levelRequirement}
                                >
                                    <MenuItem key="Không yêu cầu" value="Không yêu cầu">
                                        Không yêu cầu
                                    </MenuItem>

                                    <MenuItem key="Sinh viên" value="Sinh viên">
                                        Sinh viên
                                        </MenuItem>
                                    <MenuItem key="Giáo viên" value="Giáo viên">
                                        Giáo viên
                                        </MenuItem>
                                    <MenuItem key="Cử nhân" value="Cử nhân">
                                        Cử nhân
                                    </MenuItem>
                                    <MenuItem key="Thạc sĩ" value="Thạc sĩ">
                                        Thạc sĩ
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
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.genderRequirement === "" ? "Không yêu cầu" : this.state.classInfo.genderRequirement}
                                >
                                    <MenuItem key="Không yêu cầu" value="Không yêu cầu">
                                        Không yêu cầu
                                        </MenuItem>
                                    <MenuItem key="Nam" value="Nam">
                                        Nam
                                        </MenuItem>
                                    <MenuItem key="Nữ" value="Nữ">
                                        Nữ
                                        </MenuItem>

                                </TextField>
                            </Grid>

                            <Grid item xs={3}>
                                <TextField
                                    select
                                    name="noDay"
                                    label="Chọn số buổi dạy/tuần"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.noDay}
                                >
                                    {noDay.map((day) => (
                                        <MenuItem key={day} value={day}>
                                            {day}
                                        </MenuItem>
                                    )
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    select
                                    name="noHour"
                                    label="Chọn số giờ dạy/buổi"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={this.onHandleChooseTutor}
                                    value={this.state.classInfo.noHour}
                                >
                                    {noDay.map((day) => (
                                        <MenuItem key={day} value={day}>
                                            {day}
                                        </MenuItem>
                                    )
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    name="tuitionFee"
                                    label="Học phí dự kiến (VNĐ/tháng)"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor} onBlur={() => this.validateField(this.state.classInfo.tuitionFee, 'errSalary')}
                                />
                                {(this.state.errSalary !== '') ? <p style={{ color: "red" }}>{this.state.errSalary}</p> : ''}
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    {/* <FormLabel component="legend">Nếu bạn đã từng đăng ký tìm gia sư với trung tâm</FormLabel> */}
                                    <RadioGroup row aria-label="gender" name="parent" value={valueRadio} onChange={this.onHandleChooseTutor}>
                                        <FormControlLabel value="old" control={<Radio />} label="Phụ huynh cũ" />
                                        <FormControlLabel value="new" control={<Radio />} label="Phụ huynh mới" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {valueRadio === "old" ? <Grid item xs={12}>
                                <TextField
                                    type="number"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Số điện thoại"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                    onBlur={() => this.validateField(this.state.classInfo.phone, 'errPhone')}
                                />
                                {(this.state.errPhone !== '') ? <p style={{ color: "red" }}>{this.state.errPhone}</p> : ''}
                            </Grid> : (valueRadio === "new" ?
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Họ tên của phụ huynh"
                                                name="name"
                                                variant="outlined"
                                                size="small"
                                                onChange={this.onHandleChooseTutor}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                type="number"
                                                required
                                                fullWidth
                                                name="phone"
                                                label="Số điện thoại"
                                                variant="outlined"
                                                size="small"
                                                onChange={this.onHandleChooseTutor}
                                                onBlur={() => this.validateField(this.state.classInfo.phone, 'errPhone')}
                                            />
                                            {(this.state.errPhone !== '') ? <p style={{ color: "red" }}>{this.state.errPhone}</p> : ''}
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                fullWidth
                                                name="email"
                                                label="Email (nếu có)"
                                                variant="outlined"
                                                size="small"
                                                onChange={this.onHandleChooseTutor}
                                                onBlur={() => this.validateField(this.state.classInfo.email, 'errEmail')}
                                            />
                                            {(this.state.errEmail !== '') ? <p style={{ color: "red" }}>{this.state.errEmail}</p> : ''}
                                        </Grid>
                                    </Grid>
                                </Grid> : "")
                            }
                        </Grid>
                    </Grid>
                    <Button variant="contained" style={{ float: 'right' }} color="secondary" type="submit">Đăng ký</Button>
                </form>
            </CardContent>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchTutor: state.searchTutor
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onCreateClass: (classInfo, hasChooseTutors, history) => {
            dispatch(actCreateClassesRequest(classInfo, hasChooseTutors, history));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DangKyChonGiaSu);