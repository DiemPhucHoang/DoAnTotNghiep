import React, { Component } from 'react';
import {
    Card, CardContent, Typography, Button, AppBar, Toolbar, IconButton,
    TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, Grid, TextField, MenuItem
} from '@material-ui/core';
import { Menu, Delete } from '@material-ui/icons';

class ChonGiaSu extends Component {
    render() {
        return (
            <div className="bg-color">
                <br />
                <div className="container ">
                    <Card elevation={3}>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <Menu />
                                </IconButton>
                                <Typography variant="h7" color="inherit">
                                    GIA SƯ ĐÃ CHỌN
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">#</TableCell>
                                            <TableCell align="center">Hình ảnh</TableCell>
                                            <TableCell align="center">Họ tên</TableCell>
                                            <TableCell align="center">Năm sinh</TableCell>
                                            <TableCell align="center">Trường</TableCell>
                                            <TableCell align="center">Hiện là</TableCell>
                                            <TableCell align="center">Xóa</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">1</TableCell>
                                            <TableCell align="center">
                                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '60px' }} />
                                            </TableCell>
                                            <TableCell align="center">Hoàng Thị Diễm Phúc</TableCell>
                                            <TableCell align="center">1998</TableCell>
                                            <TableCell align="center">ĐH Sư phạm kỹ thuật TPHCM</TableCell>
                                            <TableCell align="center">Sinh viên</TableCell>
                                            <TableCell align="center">
                                                <Delete />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">2</TableCell>
                                            <TableCell align="center">
                                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '60px' }} />
                                            </TableCell>
                                            <TableCell align="center">Nguyễn Thị Kim Dung</TableCell>
                                            <TableCell align="center">1998</TableCell>
                                            <TableCell align="center">ĐH Sư phạm kỹ thuật TPHCM</TableCell>
                                            <TableCell align="center">Giáo viên</TableCell>
                                            <TableCell align="center">
                                                <Delete />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <p style={{float: 'left', color: 'red'}}>(Được chọn tối đa 3 gia sư) </p>
                            <br/>
                            <Button variant="contained" color="secondary" style={{float: 'right'}}>
                                Chọn tiếp
                            </Button>
                            <br/><br/>
                        </CardContent>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <Menu />
                                </IconButton>
                                <Typography variant="h7" color="inherit">
                                    ĐIỀN THÔNG TIN ĐĂNG KÝ CHỌN GIA SƯ
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent>
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
                                <Button variant="contained" style={{ float: 'right' }} color="secondary" type="submit">Đăng ký</Button>
                            </form>
                        </CardContent>
                        <br/><br/>
                    </Card>
                </div>
            </div>

        );
    }
}

export default ChonGiaSu;