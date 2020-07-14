import React, { Component } from 'react';
import {
    Grid, Paper, Button, AppBar, Toolbar,
    Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';

class LopDaDangKy extends Component {

    render() {
        const classRegister =
            [{
                idRegister: '1', idClass: '3', classTeach: 'Lớp 6', subject: 'Toán. Vật lý',
                tuitionFee: '2500000', payment: 'Chuyển khoản', status: 'Xem xét'
            },
            {
                idRegister: '2', idClass: '3', classTeach: 'Lớp 6', subject: 'Toán, Vật lý',
                tuitionFee: '2100000', payment: 'Chuyển khoản', status: 'Đã hủy'
            },
            {
                idRegister: '3', idClass: '3', classTeach: 'Lớp 6', subject: 'Vật lý',
                tuitionFee: '2400000', payment: 'Chuyển khoản', status: 'Không đạt'
            }
            ];
        const hasClassRegister = classRegister && classRegister.length > 0;
        return (
            <div className="bg-color">
                <div className="px-5 pt-5 pb-3 mx-5">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit">
                                LỚP ĐÃ ĐĂNG KÝ
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Paper>
                        <Grid container className="padding-class">
                            <Grid xs={3}></Grid>
                            <Grid xs={9} item style={{ marginTop: "15px" }}>
                                <label className="statusGray"></label> Xem xét
                            <label className="statusBlue"></label> Đã nhận lớp
                            <label className="statusRed"></label> Không đạt
                            </Grid>
                            
                            <Grid xs={12} item style={{ marginTop: "20px",  marginBottom: "20px"}}>
                                <TableContainer component={Paper} elevation={3}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Mã lớp</TableCell>
                                                <TableCell align="center">Lớp - môn</TableCell>
                                                <TableCell align="center">Lương/tháng</TableCell>
                                                <TableCell align="center">Hình thức thanh toán</TableCell>
                                                <TableCell align="center">Tùy chọn</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {hasClassRegister && classRegister.map((row) => (

                                                <TableRow key={row.idRegister} style={{ backgroundColor: `${row.status === "Xem xét" ? '#e7e5e5' : (row.status === "Không đạt" ? '#cc0c2f' : "#3f51b5")}` }}>
                                                    <TableCell align="center" component="th" scope="row">
                                                        {row.idClass}
                                                    </TableCell>
                                                    <TableCell align="center">{row.classTeach} - Môn {row.subject}</TableCell>
                                                    <TableCell align="center">{row.tuitionFee} vnđ</TableCell>
                                                    <TableCell align="center">{row.payment}</TableCell>
                                                    <TableCell align="center">
                                                        <Button style={{marginRight: '10px'}} onClick={this.cancelUpdate} variant="contained" color="primary" size="small">Chi tiết</Button>
                                                        <Button type="submit" variant="contained" color="secondary" size="small">Hủy lớp</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Paper>

                </div>
            </div>
        );
    }
}

export default LopDaDangKy;