import React, { Component } from 'react';
import {
    CardContent, Button, Grid, TextField, MenuItem
} from '@material-ui/core';
import {actCreateClassesRequest} from './../../actions/classes';
import { connect } from "react-redux";

class DangKyChonGiaSu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classInfo:{
               
            },
            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let idArr = [];
        this.props.tutorItem.forEach(tutor => {
            idArr.push(tutor.id);
        });
        console.log(' idArr: ',  idArr);
        this.setState((prevState) => ({
            classInfo: {
              ...prevState.classInfo,
              idTutors: idArr
            },
        }));

        this.props.onCreateClass(this.state.classInfo);
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          JSON.stringify(this.props.tutorItem) !==
          JSON.stringify(prevProps.tutorItem)
        ) {
            let idArr = [];
            this.props.tutorItem.forEach(tutor => {
                idArr.push(tutor.id);
            });
            this.setState((prevState) => ({
                classInfo: {
                  ...prevState.classInfo,
                  idTutors: idArr
                },
            }));
        }
    }

    onHandleChooseTutor = (event) => {
        let {name, value} = event.target;
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
                                <TextField
                                    fullWidth
                                    required
                                    id="standard-select-currency"
                                    name="subject"
                                    select
                                    label="Môn học"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.onHandleChooseTutor}
                                >
                                    {hasSubjects && subjects.map((option) => (
                                            <MenuItem key={option.subjectName} value={option.subjectName}>
                                                {option.subjectName}
                                            </MenuItem>
                                        ))}
                                </TextField>
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
        onCreateClass: (classInfo) => {
            dispatch(actCreateClassesRequest(classInfo));
        }
    };
};

export default connect(null, mapDispatchToProps)(DangKyChonGiaSu);