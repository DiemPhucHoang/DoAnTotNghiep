import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import RoomIcon from '@material-ui/icons/Room';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import LayersIcon from '@material-ui/icons/Layers';
import PhoneIcon from '@material-ui/icons/Phone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SchoolIcon from '@material-ui/icons/School';

class LopMoiDetail extends Component {
    render() {
        const {classItem} = this.props;
        return (
            <Grid xs={8} item>
                <Grid container item xs={12} style={{ padding: "20px" }}>
                    <Grid xs={6} item>
                        <p className="class-detail"><LayersIcon fontSize="small" /><strong>Mã lớp:</strong> {classItem.id}</p>
                        <p className="class-detail"><ClassIcon fontSize="small" /><strong>Lớp dạy:</strong> {classItem.classTeach}</p>
                        <p className="class-detail"><TurnedInNotIcon fontSize="small" /><strong>Môn dạy:</strong> {classItem.subject}</p>
                        <p className="class-detail"><RoomIcon fontSize="small" /><strong><span style={{ color: "#356ff4", fontSize: "18px" }}> {classItem.district}, TP.HCM</span></strong></p>
                        <p className="class-detail"><AlarmOnIcon fontSize="small" /><strong>Thời gian:</strong> {classItem.timeTeach}</p>
                    </Grid>
                    <Grid xs={6} item>
                        <p className="class-detail"><SchoolIcon fontSize="small" /><strong>Yêu cầu trình độ:</strong> {classItem.levelRequirement}</p>
                        <p className="class-detail"><PersonOutlineIcon fontSize="small" /><strong>Yêu cầu giới tính:</strong> {classItem.genderRequirement}</p>
                        <p className="class-detail"><AttachMoneyIcon fontSize="small" /><strong>Lương:<span style={{ color: "#fc0505", fontSize: "18px" }}> {classItem.tuitionFee} vnđ/tháng</span></strong></p>
                        <p className="class-detail"><TurnedInNotIcon fontSize="small" /><strong>Phí nhận lớp:</strong> 25%</p>
                        <p className="class-detail"><PhoneIcon fontSize="small" /><strong>Liên hệ: <span style={{ color: "#fc0505", fontSize: "18px" }}> 0963780747 - 0922345128</span>
                        </strong></p>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default LopMoiDetail;