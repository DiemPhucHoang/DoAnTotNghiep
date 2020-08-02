import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import DialogEdit from './DialogEdit';
import DoiMatKhau from './DoiMatKhau';

class ThongTinCaNhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openEditTutor: false,
            openChangePassword: false
        }
    }
    showEditTutor = () => {
        this.setState({
            openEditTutor: true,
        });
    };
    showChangePassword = () => {
        this.setState({
            openChangePassword: true,
        });
    };
    onCloseEditTutor = () => {
        this.setState({
            openEditTutor: !this.state.openEditTutor
        });
    }
    onCloseChangePassword = () => {
        this.setState({
            openChangePassword: !this.state.openChangePassword
        });
    }

    editInfoTutor = (user) => {
        this.props.changeInfoUser(user);
    }

    changeImage = (files) => {
        let formData = new FormData();
        formData.append("file", files);
        this.props.onHandleChangeImage(formData);
    }

    render() {
        const { user } = this.props;
        const hasUser = user?.image;
        return (
            <Grid item xs={4}>
                <Paper>
                    <div style={{ textAlign: 'center', padding: '15px' }}>
                        <img alt="avatar" src={!hasUser ? 'image/av3.png' : `data:image/jpg;base64,${user.image}`} className="rounded-circle" style={{ width: '50%' }} />
                        <br /><br />
                        <h6>{user?.name}</h6>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ open: true })}>
                            Cập nhật ảnh
                        </Button>
                        <DropzoneDialog
                            filesLimit={1}
                            acceptedFiles={['image/*']}
                            cancelButtonText={"cancel"}
                            submitButtonText={"submit"}
                            maxFileSize={5000000}
                            open={this.state.open}
                            onClose={() => this.setState({ open: false })}
                            onSave={(files) => {
                                this.setState({ open: false });
                                this.changeImage(files[0]);
                            }}
                            showPreviews={true}
                            showFileNamesInPreview={true}
                        />
                    </div>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        
                            <ul className='list-group list-group-unbordered'>
                                <li className='list-group-item'>
                                    <p> <b>Số điện thoại: </b>{user?.phone}</p>
                                </li>
                                <li className='list-group-item'>
                                    <p> <b>Địa chỉ: </b>{user?.address}</p>
                                </li>
                                <li className='list-group-item'>
                                    <p><b>Email: </b>{user?.email}</p>
                                </li>
                            </ul>
                       
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <Button onClick={this.showEditTutor} variant="outlined" color="primary" size="small" style={{ marginRight: "30px" }}>
                            Sửa thông tin
                        </Button>
                        <Button onClick={this.showChangePassword} variant="outlined" color="primary" size="small">Đổi mật khẩu</Button>
                    </div>
                    <DialogEdit
                        editInfoTutor={this.editInfoTutor}
                        user={user} 
                        openEditTutor={this.state.openEditTutor}
                        onCloseEditTutor={this.onCloseEditTutor}/>
                    <DoiMatKhau
                        history={this.props.history}
                        openChangePassword={this.state.openChangePassword}
                        onCloseChangePassword={this.onCloseChangePassword}/>
                </Paper>
            </Grid>

        );
    }
}

export default ThongTinCaNhan;