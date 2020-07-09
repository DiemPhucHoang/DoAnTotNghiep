import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

class ThongTinCaNhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
      render() {
            return (
                <Grid item xs={4}>
                <Paper>
                    <div style={{ textAlign: 'center', padding: '15px' }}>
                        <img alt="avatar" src="image/avata.jpg" className="rounded-circle" style={{ width: '50%' }} />
                        <br /><br />
                        <h6>HOÀNG THỊ DIỄM PHÚC</h6>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ open: true })}>
                            Add Image
                        </Button>
                        <DropzoneDialog
                            acceptedFiles={['image/*']}
                            cancelButtonText={"cancel"}
                            submitButtonText={"submit"}
                            maxFileSize={5000000}
                            open={this.state.open}
                            onClose={() => this.setState({ open: false })}
                            onSave={(files) => {
                                console.log('Files:', files);
                                this.setState({ open: false });
                            }}
                            showPreviews={true}
                            showFileNamesInPreview={true}
                        />
                    </div>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <ul className='list-group list-group-unbordered'>
                            <li className='list-group-item'>
                                <p> <b>Số điện thoại: </b>0987654321</p>
                            </li>
                            <li className='list-group-item'>
                                <p> <b>Địa chỉ: </b>01-Võ Văn Ngân-Thủ Đức-TPHCM</p>
                            </li>
                            <li className='list-group-item'>
                                <p><b>Email: </b>phuc@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px' }}>
                        <Button variant="contained" color="secondary" size="small">Đổi mật khẩu</Button>
                    </div>
                </Paper>
            </Grid>
            
            );
      }
}

export default ThongTinCaNhan;