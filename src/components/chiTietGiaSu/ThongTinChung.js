import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


class ThongTinChung extends Component {
    chooseTutor = () => {
        this.props.chooseTutor(this.props.tutorDetail.id);
    }
    render() {
        let { tutorDetail } = this.props;
        return (
            <Paper>
                <div style={{ textAlign: 'center', padding: '15px' }}>
                    <img
                        src={`data:image/jpg;base64,${tutorDetail.image}`}
                        className="rounded-circle"
                        style={{ width: '50%' }}
                        alt="avatar" />
                    <br /><br />
                    <h6>{tutorDetail.name}</h6>
                    <p>{tutorDetail.level}</p>
                </div>
                <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                    <ul className='list-group list-group-unbordered'>
                        <li className='list-group-item'>
                            <b>Lớp đã dạy</b>
                            <b className='pull-right'>2</b>
                        </li>
                        <li className='list-group-item'>
                            <b>Lượt đánh giá</b>
                            <b className='pull-right'>2</b>
                        </li>
                    </ul>
                </div>
                <div style={{ textAlign: 'center', padding: '10px' }}>

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: '5px' }}
                        onClick={this.chooseTutor}>
                        Mời dạy
                        </Button>

                    <Link to='/danh-gia-gia-su'>
                        <Button variant="contained" color="secondary" size="small">Đánh giá</Button>
                    </Link>
                </div>
            </Paper>
        );
    }
}

export default ThongTinChung;