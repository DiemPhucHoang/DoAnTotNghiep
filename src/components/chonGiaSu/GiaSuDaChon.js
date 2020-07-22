import React, { Component } from 'react';
import {
    CardContent, Button, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actDeleteChooseTutor} from './../../actions/tutor';

class GiaSuDaChon extends Component {

    onDeleteTutor = (id) => {
        if(confirm('Bạn chắc chắn muốn xóa?')){ //eslint-disable-line
            this.props.onDeleteTutor(id);
          }
    }
    render() {
        const { tutorItem } = this.props;
        const hasTutorItem = tutorItem && tutorItem.length > 0;
        // let checkTutor = false;
        return (
            <CardContent>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Hình ảnh</TableCell>
                                <TableCell align="center">Họ tên</TableCell>
                                <TableCell align="center">Năm sinh</TableCell>
                                <TableCell align="center">Trường</TableCell>
                                <TableCell align="center">Hiện là</TableCell>
                                <TableCell align="center">Xóa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hasTutorItem && tutorItem.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell align="center">{++index}</TableCell>
                                    <TableCell align="center">
                                        <img 
                                            alt="avatar" 
                                            src={`data:image/jpg;base64,${item.tutorInfoVO?.image}`} 
                                            className="rounded-circle" 
                                            style={{ width: '60px' }} 
                                            />
                                    </TableCell>
                                    <TableCell align="center">{item.tutorInfoVO?.name}</TableCell>
                                    <TableCell align="center">{item.tutorInfoVO?.yearOfBirth}</TableCell>
                                    <TableCell align="center">{item.tutorInfoVO?.college}</TableCell>
                                    <TableCell align="center">{item.tutorInfoVO?.level}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => this.onDeleteTutor(item.tutorInfoVO?.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p style={{ float: 'left', color: 'red' }}>(Nên chọn ít nhất 2 gia sư) </p>
                <br />
                {/* {tutorItem.length >= 3 ? checkTutor=true : checkTutor=false} */}
                <Link to='/tim-gia-su'>
                    <Button variant="contained" color="secondary" style={{ float: 'right' }}>
                        Chọn tiếp
                    </Button>
                </Link>
                <br /><br />
            </CardContent>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onDeleteTutor: (id) => {
        dispatch(actDeleteChooseTutor(id));
      }
    }
  }
export  default connect(null, mapDispatchToProps)(GiaSuDaChon);