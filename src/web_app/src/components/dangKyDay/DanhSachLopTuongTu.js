import React, { Component } from 'react';
import { Grid, Paper, Card, CardContent, Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';

class DanhSachLopTuongTu extends Component {
    showClassDetail = (id) => {
        this.props.history.push(`/dang-ky-day/${id}`);
        this.props.showClassDetail(id);
    }
    render() {
        const { classesSimilar } = this.props;
        const hasClassesSimilar = classesSimilar && classesSimilar.length > 0;
        return (
            <div className="px-5 mx-5">
                <Paper style={{ width: "100%", padding: "20px" }}>
                    <p>
                        <b>DANH SÁCH LỚP LIÊN QUAN</b>
                    </p>
                    <Grid container spacing={3}>
                        {hasClassesSimilar && classesSimilar.map((classItem) => (
                            <Grid key={classItem.id} item xs={4} className="paper">
                                <Card elevation={3} >
                                    <AppBar position="static">
                                        <Toolbar variant="dense">
                                            <Typography variant="h6" color="inherit">
                                                Mã lớp: {classItem.id}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <CardContent style={{ padding: '10px' }}>
                                        <p><strong>Môn dạy:</strong> {classItem.subject}</p>
                                        <p><strong>Lớp dạy:</strong> {classItem.classTeach}</p>
                                        <p><span style={{ color: "#fc0505" }}><RoomSharpIcon /></span>
                                            <span style={{ color: "#356ff4" }}> {classItem.district}, TP.HCM </span></p>
                                        <p><strong>Lương:<span style={{ color: "#fc0505" }}> {classItem.tuitionFee.toLocaleString('en-US')} vnđ/tháng</span></strong></p>
                                        <p><strong>Thời lượng:</strong> Tuần {classItem.noDay} buổi ({classItem.noHour}h/buổi)</p>
                                        <p><strong>Yêu cầu trình độ:</strong> {classItem.levelRequirement}</p>
                                        <p><strong>Yêu cầu giới tính:</strong> {classItem.genderRequirement}</p>
                                        <p><strong>Liên hệ: <span style={{ color: "#fc0505" }}> 0963780747 - 0922345128</span>
                                        </strong>
                                        </p>
                                        <div style={{ float: "right", paddingBottom: '15px' }}>
                                                <Button onClick={(e, id) => this.showClassDetail(classItem.id)} variant="contained" color="secondary" size="small">
                                                    Đăng ký dạy
                                                </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Paper>
            </div>

        );
    }
}

export default DanhSachLopTuongTu;