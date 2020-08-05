import React, { Component } from 'react';
import { Paper, AppBar, Toolbar, Typography, Table, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core';
import ThoiGianDay from './ThoiGianDay';
import { getStringName } from '../commons/util';
import DanhGiaGiaSu from './DanhGiaGiaSu';

class ThongTinChiTiet extends Component {
   render() {
      const tutorDetail  = this.props.tutorDetail.tutorInfoVO;
      const subjects = tutorDetail?.subjects;
      const classTeaches = tutorDetail?.classTeaches;
      const districts = tutorDetail?.districts;
      
      const hasValue = subjects && subjects.length > 0 && classTeaches && classTeaches.length > 0
         && districts && districts.length > 0;

      const subjectNames = hasValue && getStringName(subjects,'subjectName');
      const districtNames = hasValue && getStringName(districts,'districtName');
      const classTeachNames = hasValue && getStringName(classTeaches,'classTeachName');
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
                           <TableCell><b>{subjectNames}</b></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Lớp dạy</TableCell>
                           <TableCell><b>{classTeachNames}</b></TableCell>
                        </TableRow>
                        <TableRow>
                           <TableCell>Khu vực dạy</TableCell>
                           <TableCell><b>{districtNames}</b></TableCell>
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
            <ThoiGianDay freeTimes={tutorDetail?.freeTimes}/>
            {/*Danh gia gia su */}
            <AppBar position="static">
               <Toolbar variant="dense">
                  <Typography variant="h6" color="inherit">
                     Đánh giá gia sư
                  </Typography>
               </Toolbar>
            </AppBar>
            <DanhGiaGiaSu rate={this.props.rate}/>
         </Paper>
      );
   }
}

export default ThongTinChiTiet;