import React, { Component } from 'react';
import { Grid, Paper, Typography} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class DanhSachGiaSuDaDangKy extends Component {

    render() {
        const {tutorRegisterClass} = this.props;
        const hasTutorRegisterClass = tutorRegisterClass && tutorRegisterClass.length > 0;
        return (
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
                                {hasTutorRegisterClass && tutorRegisterClass.map((row) => (
                                   
                                    <TableRow key={row.idTutor} style={{ backgroundColor: `${row.status === "Xem xét" ? '#d6d6d6' : (row.status === "Không đạt" ?'#9B0000' : "")}`}}>
                                        <TableCell align="center" component="th" scope="row">
                                            {row.idTutor}
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

        );
    }
}

export default DanhSachGiaSuDaDangKy;