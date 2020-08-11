import React, { Component } from 'react';
import {
    Card, Grid, TextField, MenuItem, Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import {actSearchInputClassRequest} from './../../actions/classes';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

class TimLopMoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: [],
            district: "",
            classTeach: "",
            level: "",
            gender: "",
            setDefault: false
        }
    }

    componentDidMount() {
        let { subject, district, classTeach, level, gender } = this.props.search;
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
                subject: subject === ""?[]:subject.split(","),
                district: district,
                classTeach: classTeach,
                level: level,
                gender: gender
            })

        }
    }

    onChangeClass = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            setDefault: true
        })
        let { subject, district, classTeach, level, gender } = this.state;
        let search = {
            subject: subject.join(","),
            district: district === "Chọn quận" ? "" : district,
            classTeach: classTeach === "Chọn lớp" ? "" : classTeach,
            level: level === "Chọn trình độ gia sư" ? "" : level,
            gender: gender === "Chọn giới tính gia sư" ? "" : gender,
            isSearch: true
        }
        this.props.onSearchClasses(search);
        this.props.onSearchInputClass(search);
    }

      render() {
        let { subjects, classTeaches, districts } = this.props;
        const genderArr = [{ value: "Nam" }, { value: "Nữ" }];
        const levelArr = [{value: "Sinh viên"}, {value: "Giáo viên"}, {value: "Cử nhân"}, {value: "Thạc sĩ"}]; 
        const hasSubjects = subjects && subjects.length > 0;
        const hasDistricts = districts && districts.length > 0;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
            return (
                <Card variant="elevation" elevation={3}>
                <Grid container spacing={3} style={{ padding: "20px" }}>
                    <Grid item xs={2}>
                        <p style={{ textAlign: "center" }}>
                            <b>Tìm lớp phù hợp</b>
                        </p>
                        <img src="image/web_search.png" style={{ width: "100%" }} alt="find-tutor" />
                    </Grid>
                    <Grid item xs={10}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                            <Grid item xs={4}>
                                    <TextField
                                        id="standard-select-currency"
                                        name="district"
                                        select
                                        label="Chọn quận"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={this.onChangeClass}
                                        value={this.state.district}
                                    >
                                         <MenuItem key="Chọn quận" value="Chọn quận">
                                            Chọn quận
                                        </MenuItem>
                                        {hasDistricts && districts.map((option) => (
                                            <MenuItem key={option.districtName} value={option.districtName}>
                                                {option.districtName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="standard-select-currency"
                                        name="classTeach"
                                        select
                                        label="Chọn lớp"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={this.onChangeClass}
                                        value={this.state.classTeach}
                                    >
                                          <MenuItem key="Chọn lớp" value="Chọn lớp">
                                            Chọn lớp
                                        </MenuItem>
                                        {hasClassTeaches && classTeaches.map((option) => (
                                            <MenuItem key={option.classTeachName} value={option.classTeachName}>
                                                {option.classTeachName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                {/* <Grid item xs={4}>
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Chọn môn học"
                                        name="subject"
                                        onChange={this.onChangeClass}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        value={this.state.subject}
                                    >
                                        {hasSubjects && subjects.map((option) => (
                                            <MenuItem key={option.subjectName} value={option.subjectName}>
                                                {option.subjectName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={4}>
                                    <FormControl fullWidth required variant="outlined" size="small">
                                        <InputLabel id="demo-mutiple-checkbox-outlined-label">Môn học</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-checkbox-outlined-label"
                                            id="demo-mutiple-checkbox-outlined"
                                            multiple
                                            label="Môn học"
                                            onChange={this.onChangeClass}
                                            name="subject"
                                            variant="outlined"
                                            value={this.state.subject}
                                            renderValue={(selected) => selected.join(', ')}
                                        >
                                            {hasSubjects && subjects.map((subject) => (
                                                <MenuItem key={subject.subjectName} value={subject.subjectName}>
                                                    <Checkbox checked={this.state.subject.indexOf(subject.subjectName) > -1} />
                                                    <ListItemText primary={subject.subjectName} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}></Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        id="standard-select-currency"
                                        name="level"
                                        select
                                        label="Chọn trình độ gia sư"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        onChange={this.onChangeClass}
                                        value={this.state.level}
                                    >
                                         <MenuItem key="Chọn trình độ gia sư" value="Chọn trình độ gia sư">
                                            Chọn trình độ gia sư
                                        </MenuItem>
                                        {levelArr.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        id="standard-select-currency"
                                        name="gender"
                                        select
                                        label="Chọn giới tính gia sư"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={this.onChangeClass}
                                        value={this.state.gender}
                                    >
                                         <MenuItem key="Chọn giới tính gia sư" value="Chọn giới tính gia sư">
                                            Chọn giới tính gia sư
                                        </MenuItem>
                                        {genderArr.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button label="Submit" type="submit" variant="contained" color="secondary" fullWidth>
                                        Tìm kiếm
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Card>
            );
      }
}

const mapStateToProps = state => {
    return {
        search: state.searchClass
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchInputClass: (search) => {
            dispatch(actSearchInputClassRequest(search));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimLopMoi);
