import React, { Component } from 'react';
import { Grid, Paper, Card, CardContent, Button, AppBar, Toolbar, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';

class DanhSachLopTuongTu extends Component {
    render() {
        const classItem =
        {
            id: 1, classTeach: "Lớp 5", subject: "Toán", levelRequirement: "Sinh viên", genderRequirement: "Nam",
            district: "Quận 5",
            timeTeach: "T3, T5, T6",
            address: "10 Nguyễn Chí Thanh",
            tuitionFee: 1500000
        }
        return (
            <div className="px-5 mx-5">
                <Paper style={{ width: "100%", padding: "20px" }}>
                    <p>
                        <b>DANH SÁCH LỚP LIÊN QUAN</b>
                    </p>
                    <Grid container spacing={3}>
                        <Grid item xs={4} className="paper">
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
                                        <span style={{ color: "#356ff4" }}> {classItem.address}, {classItem.district}, TP.HCM </span></p>
                                    <p><strong>Lương:<span style={{ color: "#fc0505" }}> {classItem.tuitionFee} vnđ/tháng</span></strong></p>
                                    <p><strong>Thời gian:</strong> {classItem.timeTeach}</p>
                                    <p><strong>Yêu cầu trình độ:</strong> {classItem.levelRequirement}</p>
                                    <p><strong>Yêu cầu giới tính:</strong> {classItem.genderRequirement}</p>
                                    <p><strong>Liên hệ: <span style={{ color: "#fc0505" }}> 0963780747 - 0922345128</span>
                                    </strong>
                                    </p>
                                    <div style={{ float: "right", paddingBottom: '15px' }}>
                                        <Link to='/dang-ky-day'>
                                            <Button variant="contained" color="secondary" size="small">
                                                Đăng ký dạy
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4} className="paper">
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
                                        <span style={{ color: "#356ff4" }}> {classItem.address}, {classItem.district}, TP.HCM </span></p>
                                    <p><strong>Lương:<span style={{ color: "#fc0505" }}> {classItem.tuitionFee} vnđ/tháng</span></strong></p>
                                    <p><strong>Thời gian:</strong> {classItem.timeTeach}</p>
                                    <p><strong>Yêu cầu trình độ:</strong> {classItem.levelRequirement}</p>
                                    <p><strong>Yêu cầu giới tính:</strong> {classItem.genderRequirement}</p>
                                    <p><strong>Liên hệ: <span style={{ color: "#fc0505" }}> 0963780747 - 0922345128</span>
                                    </strong>
                                    </p>
                                    <div style={{ float: "right", paddingBottom: '15px' }}>
                                        <Link to='/dang-ky-day'>
                                            <Button variant="contained" color="secondary" size="small">
                                                Đăng ký dạy
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={4} className="paper">
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
                                        <span style={{ color: "#356ff4" }}> {classItem.address}, {classItem.district}, TP.HCM </span></p>
                                    <p><strong>Lương:<span style={{ color: "#fc0505" }}> {classItem.tuitionFee} vnđ/tháng</span></strong></p>
                                    <p><strong>Thời gian:</strong> {classItem.timeTeach}</p>
                                    <p><strong>Yêu cầu trình độ:</strong> {classItem.levelRequirement}</p>
                                    <p><strong>Yêu cầu giới tính:</strong> {classItem.genderRequirement}</p>
                                    <p><strong>Liên hệ: <span style={{ color: "#fc0505" }}> 0963780747 - 0922345128</span>
                                    </strong>
                                    </p>
                                    <div style={{ float: "right", paddingBottom: '15px' }}>
                                        <Link to='/dang-ky-day'>
                                            <Button variant="contained" color="secondary" size="small">
                                                Đăng ký dạy
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

        );
    }
}

export default DanhSachLopTuongTu;