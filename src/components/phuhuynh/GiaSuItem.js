import React, { Component } from "react";
import {
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import { Link } from 'react-router-dom';

class GiaSuItem extends Component {

    chooseTutor = () => {
        this.props.chooseTutor(this.props.tutorItem.id);
    }

    render() {
        let { tutorItem } = this.props;
        let { subjects } = tutorItem;
        // let subjectNames = subjects.map(function (subjects) {
        //     return subjects['subjectName'];
        // });
        let { districts } = tutorItem;
        return (
            <Grid item xs={4} className="paper">

                <Paper elevation={3} style={{ padding: "10px", height: '370px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <img
                                src={`data:image/jpg;base64,${tutorItem.image}`}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: "100%" }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <br />
                            <h6>{tutorItem.name}</h6>
                            <p>{tutorItem.level}</p>
                        </Grid>
                        <hr />
                        <Grid item xs={12} style={{ padding: "20px" }}>
                            <p>Trường: {tutorItem.college}</p>
                            <p>Năm sinh: {tutorItem.yearOfBirth}</p>
                            <p>Môn dạy: {subjects.join(', ')}</p>
                            <p>Khu vực: {districts.join(', ')}</p>
                            <p>Yêu cầu: {tutorItem.salaryPerHour} vnđ/h</p>
                            
                            <p>
                                <Link to={`/chi-tiet-gia-su/${tutorItem.id}`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={this.showInfoTutor}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Link>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        style={{ float: "right" }}
                                        onClick={this.chooseTutor}
                                    >
                                        Chọn gia sư
                                    </Button>
                            </p>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default GiaSuItem;
