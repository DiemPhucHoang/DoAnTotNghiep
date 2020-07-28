import React, { Component } from 'react';
import {
    Grid, Paper, Button, Typography, Table, TableContainer,
    TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DialogDanhGia from '../danhGiaGiaSu/DialogDanhGia';
import Avatar from '@material-ui/core/Avatar';

class DanhSachGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openRating: false,
            idTutor : null,
        }
    }

    showDialogRating = idTutor => {
        this.setState({
            openRating: true,
            idTutor,
        })
    }

    onCloseDialogRating = () => {
        this.setState({
            openRating: !this.state.openRating
        })
    }

    render() {
        const { tutors } = this.props;
        const hasTutors = tutors && tutors.length > 0;

        return (
            <Paper style={{ marginTop: "15px" }}>
                <Typography style={{ padding: "20px" }} variant="h6">
                    DANH SÁCH GIA SƯ
                        </Typography>
                <Grid container className="padding-class">
                    <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                        <TableContainer component={Paper} elevation={3}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Mã gia sư</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Hình ảnh</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Họ tên</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Giới tính</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Hiện là</TableCell>
                                        <TableCell align="center" style={{ fontWeight: "bold" }}>Tùy chọn</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {hasTutors && tutors.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center" component="th" scope="row">
                                                00{row.id}
                                            </TableCell>
                                            <TableCell align="center" className="test">
                                                <Avatar style={{ width: "90%", height: "90%" }} alt="Remy Sharp" src={`data:image/jpg;base64,${row.image}`} />
                                            </TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.gender}</TableCell>
                                            <TableCell align="center">{row.level}</TableCell>
                                            <TableCell align="center">
                                                <Link to={`/chi-tiet-gia-su/${row.id}`}>
                                                    <Button variant="contained" size="small">Chi tiết</Button>
                                                </Link>
                                                <Button
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => this.showDialogRating(row.id)}
                                                    variant="contained"
                                                    size="small"
                                                    color="primary">
                                                    Đánh giá
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <DialogDanhGia
                    phone={this.props.phone}
                    idTutor={this.state.idTutor}
                    openRating={this.state.openRating}
                    onCloseDialogRating={this.onCloseDialogRating} />
            </Paper>

        );
    }
}

export default DanhSachGiaSu;