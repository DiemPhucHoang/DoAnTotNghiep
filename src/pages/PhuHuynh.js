import React, { Component } from 'react';
import {
    Card, Grid, Paper, TextField, InputAdornment, MenuItem, Button,
    Dialog, DialogTitle, DialogContent, Table, TableCell, TableBody, TableRow
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';


class PhuHuynh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitRequest: false,
            showInfo: false
        }
    }

    showSubmitRequest = () => {
        this.setState({
            submitRequest: true,
        });
    };
    onCloseSubmitRequest = () => {
        this.setState({
            submitRequest: !this.state.submitRequest
        });
    }

    showInfoTutor = () => {
        this.setState({
            showInfo: true,
        });
    }
    onCloseShowInfoTutor = () => {
        this.setState({
            showInfo: !this.state.showInfo
        });
    }


    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }



    render() {
        var { submitRequest, showInfo } = this.state;
        return (
            <div className="bg-color">
                <div className="container ">
                    {/* Tim gia su nhanh */}
                    <Card variant="elevation" elevation={3} >
                        <Grid container spacing={3} style={{ padding: '20px' }}>
                            <Grid item xs={2} >
                                <p style={{ textAlign: 'center' }}><b>Tìm gia sư nhanh</b></p>
                                <img src="image/find_tutor.png" style={{ width: '100%' }} />
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="standard-select-currency"
                                            label="Nhập từ khóa hoặc tên gia sư"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <Search color="disabled" />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Chọn môn học"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={this.onChange}
                                        >
                                            <MenuItem key="Toán" value="Toán">Toán</MenuItem>
                                            <MenuItem key="Anh văn" value="Anh văn">Anh văn</MenuItem>
                                            <MenuItem key="Toán" value="Toán">Toán</MenuItem>
                                            <MenuItem key="Anh văn" value="Anh văn">Anh văn</MenuItem>
                                            <MenuItem key="Toán" value="Toán">Toán</MenuItem>
                                            <MenuItem key="Anh văn" value="Anh văn">Anh văn</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Chọn lớp"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            onChange={this.onChange}
                                        >
                                            <MenuItem key="Lớp 1" value="Lớp 1">Lớp 1</MenuItem>
                                            <MenuItem key="Lớp 2" value="Lớp 2">Lớp 2</MenuItem>
                                            <MenuItem key="Lớp 3" value="Lớp 3">Lớp 3</MenuItem>
                                            <MenuItem key="Lớp 4" value="Lớp 4">Lớp 4</MenuItem>
                                            <MenuItem key="Lớp 5" value="Lớp 5">Lớp 5</MenuItem>
                                            <MenuItem key="Lớp 6" value="Lớp 6">Lớp 6</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Chọn quận"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={this.onChange}
                                        >
                                            <MenuItem key="Quận 1" value="Quận 1">Quận 1</MenuItem>
                                            <MenuItem key="Quận 2" value="Quận 2">Quận 2</MenuItem>
                                            <MenuItem key="Quận 3" value="Quận 3">Quận 3</MenuItem>
                                            <MenuItem key="Quận 4" value="Quận 4">Quận 4</MenuItem>
                                            <MenuItem key="Quận 5" value="Quận 5">Quận 5</MenuItem>
                                            <MenuItem key="Quận 6" value="Quận 6">Quận 6</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Chọn trình độ gia sư"
                                            variant="outlined"
                                            fullWidth
                                            size="small"
                                            onChange={this.onChange}
                                        >
                                            <MenuItem key="Giáo viên" value="Toán">Giáo viên</MenuItem>
                                            <MenuItem key="Sinh viên" value="Sinh viên">Sinh viên</MenuItem>
                                            <MenuItem key="Thạc sỹ" value="Thạc sỹ">Thạc sỹ</MenuItem>
                                            <MenuItem key="Cử nhân sư phạm" value="Cử nhân sư phạm">Cử nhân sư phạm</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Chọn giới tính gia sư"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            onChange={this.onChange}
                                        >
                                            <MenuItem key="Toán" value="Toán">Nam</MenuItem>
                                            <MenuItem key="Anh văn" value="Anh văn">Nữ</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button variant="contained" color="secondary" fullWidth>
                                            Tìm kiếm
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                    <br />
                    {/* Danh sach gia su */}
                    <Paper style={{ padding: '20px' }}>
                        <p>
                            <b>DANH SÁCH GIA SƯ</b>
                            <Button onClick={this.showSubmitRequest} variant="contained" color="primary" style={{ float: "right" }}>
                                + Đăng yêu cầu
                            </Button>
                            {/* Dang yeu cau tim gia su */}
                            <Dialog open={submitRequest} onClose={this.handleClick} fullWidth maxWidth="md">
                                <DialogTitle id="draggable-dialog-title">
                                    Đăng yêu cầu tìm gia sư
                                </DialogTitle>
                                <DialogContent>
                                    <form>
                                        <Grid container spacing={3} style={{ padding: '20px' }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="standard-select-currency"
                                                        label="Môn học"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="standard-select-currency"
                                                        select
                                                        label="Lớp dạy"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        onChange={this.onChange}
                                                    >
                                                        <MenuItem key="Lớp 1" value="Lớp 1">Lớp 1</MenuItem>
                                                        <MenuItem key="Lớp 2" value="Lớp 2">Lớp 2</MenuItem>
                                                        <MenuItem key="Lớp 3" value="Lớp 3">Lớp 3</MenuItem>
                                                        <MenuItem key="Lớp 4" value="Lớp 4">Lớp 4</MenuItem>
                                                        <MenuItem key="Lớp 5" value="Lớp 5">Lớp 5</MenuItem>
                                                        <MenuItem key="Lớp 6" value="Lớp 6">Lớp 6</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="standard-select-currency"
                                                        select
                                                        label="Chọn trình độ gia sư"
                                                        variant="outlined"
                                                        fullWidth
                                                        size="small"
                                                        onChange={this.onChange}
                                                    >
                                                        <MenuItem key="Giáo viên" value="Toán">Giáo viên</MenuItem>
                                                        <MenuItem key="Sinh viên" value="Sinh viên">Sinh viên</MenuItem>
                                                        <MenuItem key="Thạc sỹ" value="Thạc sỹ">Thạc sỹ</MenuItem>
                                                        <MenuItem key="Cử nhân sư phạm" value="Cử nhân sư phạm">Cử nhân sư phạm</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="standard-select-currency"
                                                        select
                                                        label="Chọn giới tính gia sư"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        onChange={this.onChange}
                                                    >
                                                        <MenuItem key="Nam" value="Nam">Nam</MenuItem>
                                                        <MenuItem key="Nữ" value="Nữ">Nữ</MenuItem>
                                                        <MenuItem key="Không yêu cầu" value="Không yêu cầu">Không yêu cầu</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Học phí dự kiến (VNĐ/tháng)"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        select
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Số buổi dạy/tuần"
                                                        variant="outlined"
                                                        size="small"
                                                    >
                                                        <MenuItem key="1" value="1">1</MenuItem>
                                                        <MenuItem key="2" value="2">2</MenuItem>
                                                        <MenuItem key="3" value="3">3</MenuItem>
                                                        <MenuItem key="4" value="4">4</MenuItem>
                                                        <MenuItem key="5" value="5">5</MenuItem>
                                                        <MenuItem key="6" value="6">6</MenuItem>
                                                        <MenuItem key="7" value="7">7</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        select
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Số giờ dạy/buổi"
                                                        variant="outlined"
                                                        size="small"
                                                    >
                                                        <MenuItem key="1" value="1">1 giờ</MenuItem>
                                                        <MenuItem key="1.5" value="1.5">1.5 giờ</MenuItem>
                                                        <MenuItem key="2" value="2">2 giờ</MenuItem>
                                                        <MenuItem key="2.5" value="2.5">2.5 giờ</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="standard-select-currency"
                                                        select
                                                        label="Chọn quận"
                                                        variant="outlined"
                                                        size="small"
                                                        fullWidth
                                                        onChange={this.onChange}
                                                    >
                                                        <MenuItem key="Quận 1" value="Quận 1">Quận 1</MenuItem>
                                                        <MenuItem key="Quận 2" value="Quận 2">Quận 2</MenuItem>
                                                        <MenuItem key="Quận 3" value="Quận 3">Quận 3</MenuItem>
                                                        <MenuItem key="Quận 4" value="Quận 4">Quận 4</MenuItem>
                                                        <MenuItem key="Quận 5" value="Quận 5">Quận 5</MenuItem>
                                                        <MenuItem key="Quận 6" value="Quận 6">Quận 6</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Địa chỉ cụ thể"
                                                        placeholder="Số nhà, tên đường, tên phường"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Họ tên của phụ huynh"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Số điện thoại"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="standard-select-currency"
                                                        label="Email (nếu có)"
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <hr />
                                        <div textAlign="center">
                                            <Button variant="contained" style={{ float: 'right' }} color="primary" type="submit">Đăng yêu cầu</Button>
                                            <Button variant="contained" style={{ float: 'right', marginRight: '20px' }} onClick={this.onCloseSubmitRequest}>Hủy</Button>
                                        </div>

                                    </form>
                                </DialogContent>
                            </Dialog>
                        </p> <br />
                        {/* Danh sach gia su */}
                        <Grid container spacing={3}>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" className="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small" onClick={this.showInfoTutor}>Xem chi tiết</Button>
                                                <a href="/chon-gia-su">
                                                    <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                                </a>
                                                
                                            </p>
                                        </Grid>
                                    </Grid>
                                    <Dialog
                                        fullWidth
                                        maxWidth="md"
                                        open={showInfo}
                                        onClose={this.onCloseShowInfoTutor}
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                           <h3 style={{textAlign: 'center'}}> Thông tin chi tiết của gia sư</h3>
                                        </DialogTitle>
                                        <DialogContent>
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                    <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                                    <br /><br />
                                                    <div style={{ textAlign: 'center' }}>
                                                        <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                                        <p>Sinh viên</p>
                                                        <Button variant="contained" color="secondary" size="small">Chọn gia sư</Button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Table bo>
                                                        <TableRow>
                                                            <TableCell>Trường</TableCell>
                                                            <TableCell><b>Đại học sư phạm kỹ thuật TPHCM</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Chuyên ngành</TableCell>
                                                            <TableCell><b>Công nghệ thông tin</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Năm tốt nghiệp</TableCell>
                                                            <TableCell><b>2020</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Dạy môn</TableCell>
                                                            <TableCell><b>Toán, Vật Lý</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Lớp dạy</TableCell>
                                                            <TableCell><b>Lớp 6, Lớp 7</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Khu vực dạy</TableCell>
                                                            <TableCell><b>Q.Tân Bình, Q.Gò Vấp, Q.Phú Nhuận, Q.Bình Tân</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Yêu cầu lương</TableCell>
                                                            <TableCell><b>200.000 VNĐ/buổi</b></TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Thời gian dạy</TableCell>
                                                            <TableCell>
                                                                
                                                            </TableCell>
                                                        </TableRow>
                                                    </Table>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <h5 style={{textAlign: 'center'}}>DANH SÁCH CÁC LỚP ĐÃ DẠY</h5>
                                                </Grid>
                                            </Grid>
                                        </DialogContent>
                                        {/* <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Disagree
                                            </Button>
                                            <Button onClick={handleClose} color="primary" autoFocus>
                                                Agree
                                            </Button>
                                        </DialogActions> */}
                                    </Dialog>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>NGUYỄN THỊ KIM DUNG</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small" >Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>NGUYỄN THỊ KIM DUNG</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%' }} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br />
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr />
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{ float: 'right' }}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        <br />
                        {/* Phan trang */}
                        <div style={{ float: 'right' }}>
                            <Pagination count={5} color="primary" />
                        </div>
                        <br /><br />
                        <style jsx>
                            {`
                            .paper{
                                transition: transform 0.5s;
                            }
                            .paper:hover{
                                transform: scale(1.05 , 1.05);
                                // box-shadow: 5px 5px 2px, -5px -5px 2px;
                            }                   
                            `}
                        </style>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default PhuHuynh;