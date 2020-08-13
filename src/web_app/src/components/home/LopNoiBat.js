import React, { Component } from 'react';
import { Button, Grid, Paper, Card, CardContent, Typography, AppBar, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

class LopNoiBat extends Component {
    render() {
        const { classList } = this.props;
        const hasClassList = classList && classList.length > 0;
        return (
            <div className="p-5 mx-5">
                <Paper elevation={0}>
                    <h4 style={{ textAlign: "center" }}>LỚP NỔI BẬT</h4>
                    <Grid container spacing={4} style={{ padding: '10px' }}>
                        {hasClassList && classList.map((classItem) => (
                            <Grid key={classItem.id} item xs={3} className="paper">
                                <Card elevation={3} style={{height: '300px' }}>
                                    <AppBar position="static">
                                        <Toolbar variant="dense">
                                            <Typography variant="h6" color="inherit">
                                                Mã lớp: 00{classItem.id}
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                    <CardContent style={{ padding: '10px' }}>
                                        <p><b>Lớp dạy: </b> {classItem.classTeach}</p>
                                        <p><b>Môn dạy: </b> {classItem.subject}</p>
                                        <p><b>Lương: </b> {classItem.tuitionFee.toLocaleString('en-US')} vnđ/tháng</p>
                                        <p><strong>Thời lượng:</strong> Tuần {classItem.noDay} buổi ({classItem.noHour}h/buổi)</p>
                                        <p><b>Địa chỉ: </b> {classItem.district}, TP. HCM</p>
                                        <div style={{ float: "right", paddingBottom: '15px' }}>
                                            <Link to={`/dang-ky-day/${classItem.id}`}>
                                                <Button variant="contained" color="secondary" size="small">
                                                    Đăng ký dạy
                                                </Button>
                                            </Link>
                                            
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
                <Link to="/lop-moi" style={{ float: 'right' }}>
                    <b> Xem thêm</b>
                </Link>
            </div>
        );
    }
}

export default LopNoiBat;