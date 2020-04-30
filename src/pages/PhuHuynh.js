import React, { Component } from 'react';
import { Card, Grid, Paper, TextField, InputAdornment, MenuItem, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

class PhuHuynh extends Component {
    render() {
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
                                            label="Nhập từ khóa hoặc mã gia sư"
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
                        <p><b>DANH SÁCH GIA SƯ</b></p>
                        <hr />
                        <Grid container spacing={3}>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p> 
                                        </Grid>  
                                    </Grid>
                                    
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>NGUYỄN THỊ KIM DUNG</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small" >Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>  
                                    </Grid>     
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>  
                                    </Grid>     
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>NGUYỄN THỊ KIM DUNG</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>  
                                    </Grid>     
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>  
                                    </Grid>     
                                </Paper>
                            </Grid>
                            <Grid item xs={4} className="paper">
                                <Paper elevation={3} style={{ padding: '10px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <img src="image/avata.jpg" class="rounded-circle" style={{ width: '100%'}} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <br/>
                                            <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                                            <p>Sinh viên</p>
                                        </Grid>
                                        <hr/>
                                        <Grid item xs={12} style={{ padding: '20px' }}>
                                            <p>Trường: ĐH Sư phạm kỹ thuật TPHCM</p>
                                            <p>Năm sinh: 1998</p>
                                            <p>Môn dạy: Toán, Vật Lý</p>
                                            <p>Khu vực: Quận Thủ Đức, Quận 2</p>
                                            <p>
                                                <Button variant="contained" color="primary" size="small">Xem chi tiết</Button>
                                                <Button variant="contained" color="secondary" size="small" style={{float: 'right'}}>Chọn gia sư</Button>
                                            </p>
                                        </Grid>  
                                    </Grid>     
                                </Paper>
                            </Grid>
                        </Grid>
                        <br/>
                        <div style={{float: 'right'}}>
                            <Pagination count={5} color="primary"/>
                        </div>
                        <br/><br/>
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