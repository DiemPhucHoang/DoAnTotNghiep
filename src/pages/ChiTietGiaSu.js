import React, { Component } from 'react';
import { Grid, Paper, Button, AppBar, Toolbar, Typography, Table, TableCell, Avatar, TableRow } from '@material-ui/core';

class ChiTietGiaSu extends Component {
    render() {
        return (
            <div className="bg-color">
                <div className="container ">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Paper>
                                <div style={{ textAlign: 'center', padding: '15px' }}>
                                    <img src="image/avata.jpg" class="rounded-circle" style={{ width: '70%' }} />
                                    <br /><br />
                                    <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                    <p>Sinh viên</p>
                                </div>
                                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                    <ul className='list-group list-group-unbordered'>
                                        <li className='list-group-item'>
                                            <b>Lớp đã dạy</b>
                                            <b className='pull-right'>2</b>
                                        </li>
                                        <li className='list-group-item'>
                                            <b>Lượt đánh giá</b>
                                            <b className='pull-right'>2</b>
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ textAlign: 'center', padding: '10px' }}>
                                    <Button variant="contained" color="primary" size="small" style={{ marginRight: '5px' }}>Mời dạy</Button>
                                    <Button variant="contained" color="secondary" size="small">Đánh giá</Button>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Paper>
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <Typography variant="h6" color="inherit">
                                            Thông tin chi tiết
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                    <Table>
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
                                    </Table>
                                </div>
                                {/* Lịch dạy */}
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <Typography variant="h6" color="inherit">
                                            Thời gian dạy
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div>
                                    <div className="gblock-v2">
                                        <div className="body-block block-calender">
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 2</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button variant="contained" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 3</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button variant="contained" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 4</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button variant="contained" color="secondary">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button variant="contained" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 5</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button disabled variant="contained">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 6</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button variant="contained" color="secondary">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button disabled variant="contained">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Thứ 7</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button variant="contained" color="secondary">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button variant="contained" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row-calendar">
                                                <p className="mr-30">Chủ nhật</p>
                                                <ul>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Sáng</Button>
                                                    </li>
                                                    <li className="calendar-normal">
                                                        <Button disabled variant="contained">Chiều</Button>
                                                    </li>
                                                    <li className="calendar-active">
                                                        <Button variant="contained" color="secondary">&ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <Typography variant="h6" color="inherit">
                                            Đánh giá gia sư
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <div style={{ padding: '20px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={1}>
                                            <Avatar style={{ width: '50px', height: '50px' }}>T</Avatar>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <h5>Lê Thị Thùy Trang <small><i>Đã nhận xét vào 17-01-2020</i></small></h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3}>
                                        <Grid item xs={1}>
                                            <Avatar style={{ width: '50px', height: '50px', backgroundColor: '#ff5722' }}>H</Avatar>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <h5>Phạm Thị Ngọc Hường <small><i>Đã nhận xét vào 17-01-2020</i></small></h5>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ChiTietGiaSu;