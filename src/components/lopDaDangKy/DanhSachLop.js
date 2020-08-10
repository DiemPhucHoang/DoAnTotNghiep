import React, { Component } from 'react';
import {
    Grid, Paper, Button, Table, TableContainer,
    TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import { Link } from 'react-router-dom';

class DanhSachLop extends Component {
    handleChangeStatus = (idRegister) => {
        this.props.onChangeStatus(idRegister);
    }

    render() {
        const { classRegister } = this.props;
        const hasClassRegister = classRegister && classRegister.length > 0;
        return (
            <Paper>
                <Grid container className="padding-class">
                    <Grid item xs={3}></Grid>
                    <Grid item xs={9} style={{ marginTop: "15px", display: "flex" }}>

                        <label className="statusGray"></label>
                        <label>Xem xét</label>

                        <label className="statusBlue"></label> <label>Đã nhận lớp</label>
                        <label className="statusRed"></label> <label>Không đạt</label>
                        <label className="statusCancel"></label> <label>Đã hủy</label>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <TableContainer component={Paper} elevation={3}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Ngày đăng ký</TableCell>
                                        <TableCell align="center">Mã lớp</TableCell>
                                        <TableCell align="center">Lớp - môn</TableCell>
                                        <TableCell align="center">Lương/tháng</TableCell>
                                        <TableCell align="center">Hình thức thanh toán</TableCell>
                                        <TableCell align="center">Tùy chọn</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {hasClassRegister && classRegister.map((row) => (
                                        <TableRow key={row.idRegister} style={{ backgroundColor: `${row.status === "Xem xét" ? '#e7e5e5' : (row.status === "Không đạt" ? '#b65c5c' : ((row.status === "Đã nhận lớp" || row.status === "Đã nhận lớp - phụ huynh chọn") ? "#a2aeee" : "#f9b86d"))}` }}>
                                            <TableCell align="center" component="th" scope="row">
                                                {row.time}
                                            </TableCell>
                                            <TableCell align="center">00{row.idClass}</TableCell>
                                            <TableCell align="center">{row.classTeach} - Môn {row.subject}</TableCell>
                                            <TableCell align="center">{row.tuitionFee} vnđ</TableCell>
                                            <TableCell align="center">{row.payment}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    disabled={row.status === "Xem xét" ? false : true}
                                                    style={{ marginRight: '10px' }}
                                                    onClick={() => this.handleChangeStatus(row.idRegister)}
                                                    variant="contained"
                                                    size="small">
                                                    Hủy lớp
                                                        </Button>
                                                <Link to={`/dang-ky-day/${row.idClass}`}>
                                                    <Button variant="contained" color="primary" size="small">Chi tiết</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>

        );
    }
}

export default DanhSachLop;