import React, { Component } from 'react';
import { Grid, Paper, AppBar, Toolbar, Typography, Table, TableCell, Avatar, TableRow, TableHead, TableBody } from '@material-ui/core';
import ThoiGianDay from './ThoiGianDay';

class ThongTinChiTiet extends Component {
   render() {
      const { tutorDetail } = this.props;
      const { subjects } = tutorDetail;
      const { classTeaches } = tutorDetail;
      const { districts } = tutorDetail;
      const hasValue = subjects && subjects.length > 0 && classTeaches && classTeaches.length > 0
         && districts && districts.length > 0;
      return (
         <Paper>
            <AppBar position="static">
               <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit">
                     Thông tin chi tiết
                  </Typography>
               </Toolbar>
            </AppBar>
            {hasValue && (
               <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Trường</TableCell>
                           <TableCell><b>{tutorDetail.college}</b></TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        <TableRow>
                           <TableCell>Chuyên ngành</TableCell>
                           <TableCell><b>{tutorDetail.major}</b></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Năm tốt nghiệp</TableCell>
                           <TableCell><b>{tutorDetail.graduationYear}</b></TableCell>
                        </TableRow>

                        <TableRow>
                           <TableCell>Dạy môn</TableCell>
                           <TableCell><b>{subjects.join(', ')}</b></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Lớp dạy</TableCell>
                           <TableCell><b>{classTeaches.join(', ')}</b></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Khu vực dạy</TableCell>
                           <TableCell><b>{districts.join(', ')}</b></TableCell>
                        </TableRow>
                        <TableRow>
                              <TableCell>Yêu cầu lương</TableCell>
                              <TableCell><b>{tutorDetail.salaryPerHour} vnđ/h</b></TableCell>
                        </TableRow>
                     </TableBody>
                  </Table>
               </div>
            )}
            {/* Lịch dạy */}
            <AppBar position="static">
               <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit">
                     Thời gian dạy
                  </Typography>
               </Toolbar>
            </AppBar>
            <ThoiGianDay freeTimes={tutorDetail.freeTimes}/>
            {/*Danh gia gia su */}
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     </p>
                  </Grid>
               </Grid>
            </div>
         </Paper>
      );
   }
}

export default ThongTinChiTiet;