import React, { Component } from 'react';
import {
    Card, Grid, TextField, MenuItem, Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import {actSearchInputClassRequest} from './../../actions/classes';

class SearchClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: "",
            district: "",
            classTeach: "",
            level: "",
            gender: ""
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
        let { subject, district, classTeach, level, gender } = this.state;
        let search = {
            subject: subject,
            district: district,
            classTeach: classTeach,
            level: level,
            gender: gender,
            isSearch: true
        }
        this.props.onSearchClasses(search);
        this.props.onSearchInputClass(search);
    }

      render() {
        let { subjects, classTeaches, districts } = this.props;
        const genderArr = [{ value: "Nam" }, { value: "Nữ" }, { value: "Không yêu cầu" }];
        const levelArr = [{value: "Sinh viên"}, {value: "Giáo viên"}, {value: "Cử nhân"}, {value: "Thạc sĩ"}];
        const hasSubjects = subjects && subjects.length > 0;
        const hasDistricts = districts && districts.length > 0;
        const hasClassTeaches = classTeaches && classTeaches.length > 0;
            return (   
                <Grid container spacing={3} style={{ padding: "15px" }}>  
                    <Grid item xs={12}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
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
                                        {hasClassTeaches && classTeaches.map((option) => (
                                            <MenuItem key={option.classTeachName} value={option.classTeachName}>
                                                {option.classTeachName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
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
                                        {hasDistricts && districts.map((option) => (
                                            <MenuItem key={option.districtName} value={option.districtName}>
                                                {option.districtName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
            );
      }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchInputClass: (search) => {
            dispatch(actSearchInputClassRequest(search));
        }
    };
};

export default connect(null, mapDispatchToProps)(SearchClass);