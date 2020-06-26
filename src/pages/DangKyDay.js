import React, { Component } from 'react';
import { Grid, Paper, Card, CardContent, Button, AppBar, Toolbar, Typography, TextField, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import LopMoiDetail from './../components/dangKyDay/LopMoiDetail';
import { connect } from 'react-redux';
import {actFetchClassDetailRequest} from './../actions/classes';

class DangKyDay extends Component {

    handleChange = () => {

    }
    createData = (id, name, gender, level, payment, status) => {
        return { id, name, gender, level, payment, status };
    }

    componentDidMount() {
        const {match} = this.props;
        if(match) {
            const id = match.params.id;
            this.props.onFetchClassDetail(id);
        }
    }

    render() {
        const rows = [
            this.createData(1, "Nguyễn Thị Kim Dung", "Nữ", "Sinh viên", "Chuyển khoản", "#d6d6d6"),
            this.createData(2, "Hoàng Thị Diễm Phúc", "Nữ", "Sinh viên", "Đến trung tâm", "#9b0000"),
            this.createData(3, "Hoàng Thị Diễm Phúc", "Nam", "Sinh viên", "Chuyển khoản", "#d6d6d6"),
        ];
        const classItem =
        {
            id: 1, classTeach: "Lớp 5", subject: "Toán", levelRequirement: "Sinh viên", genderRequirement: "Nam",
            district: "Quận 5",
            timeTeach: "T3, T5, T6",
            address: "10 Nguyễn Chí Thanh",
            tuitionFee: 1500000
        }
        const {classes} = this.props;
        return (
            <div className="bg-color">
                <div className="px-5 pt-5 pb-3 mx-5">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                LỚP ĐANG CẦN GIA SƯ
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper style={{ width: "100%", paddingBottom: "20px" }}>
                        <Grid container style={{ paddingRight: "20px" }}>
                            <LopMoiDetail classItem={classes}/>
                            <Grid item xs={4} style={{ marginTop: "20px" }}>
                                <Paper elevation={3} style={{ padding: '20px' }}>
                                    <Typography variant="h6" style={{ color: "#3F51B5" }}>
                                        Đăng ký nhận lớp
                                    </Typography>
                                    <br />
                                    <form >
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="date"
                                                    label="Ngày nhận lớp"
                                                    type="date"
                                                    required
                                                    defaultValue="2017-05-24"
                                                    className="date-receive"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="standard-select-currency"
                                                    select
                                                    label="Hình thức thanh toán"
                                                    name="subject"
                                                    required
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                >
                                                    <MenuItem key="1" value="Chuyển khoản">
                                                        Chuyển khoản
                                                    </MenuItem>
                                                    <MenuItem key="2" value="Đến trung tâm">
                                                        Đến trung tâm
                                                    </MenuItem>
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="outlined-textarea"
                                                    label="Yêu cầu thêm (nếu có)"
                                                    placeholder="Placeholder"
                                                    multiline
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button label="Submit" type="submit" variant="contained" color="secondary">
                                                    Đăng ký
                				                    </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container className="padding-class">
                            <Grid xs={4} item>
                                <Typography variant="h6">
                                    Danh sách gia sư đã đăng ký
                                </Typography>
                            </Grid>
                            <Grid xs={4} item>
                                <label className="statusGray"></label> Xem xét
                                <label className="statusRed"></label> Không đạt
                            </Grid>
                            <Grid xs={12} item style={{ marginTop: "15px" }}>
                                <TableContainer component={Paper} elevation={3}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Mã gia sư</TableCell>
                                                <TableCell align="center">Họ tên</TableCell>
                                                <TableCell align="center">Giới tính</TableCell>
                                                <TableCell align="center">Hiện là</TableCell>
                                                <TableCell align="center">Hình thức thanh toán</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.id} style={{ backgroundColor: `${row.status}` }}>
                                                    <TableCell align="center" component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.gender}</TableCell>
                                                    <TableCell align="center">{row.level}</TableCell>
                                                    <TableCell align="center">{row.payment}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container className="padding-class">
                            <Grid item xs={12}>
                                <p style={{ fontStyle: "italic" }}>
                                    <strong style={{ color: "red" }}>(*)</strong>Cho phép tối đa 5 người
                                    đăng ký. Chỉ giao lớp cho 1 người đủ điều kiện đóng lệ phí trước.
                                </p>
                                <p>
                                    <strong style={{ color: "red" }}>Lưu ý</strong>: Trung tâm{" "}
                                    <span style={{ fontWeight: "bold" }}>Gia sư Ánh Dương</span> ưu tiên
                                    người đủ điều kiện, đóng lệ phí sớm. Trước khi chuyển khoản hoặc tới
                                    trung tâm theo giờ bạn đã hẹn hãy gọi số{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        0902684422 hoặc 0902504900
                                    </span>{" "}
                                    để kiểm tra trạng thái lớp chính xác.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
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
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        classes: state.classes
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onFetchClassDetail: (id) => {
        dispatch(actFetchClassDetailRequest(id));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DangKyDay);