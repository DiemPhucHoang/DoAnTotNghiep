import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ThongTinCaNhan from './../components/hoSoGiaSu/ThongTinCaNhan';
import ThongTinHoSo from './../components/hoSoGiaSu/ThongTinHoSo';

class HoSoGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstFreeTime : 
                [{ id: 1, morning: false, afternoon: false, evening: false, dayName: "Thứ 2" },
                { id: 2, morning: false, afternoon: false, evening: false, dayName: "Thứ 3" },
                { id: 3, morning: false, afternoon: false, evening: false, dayName: "Thứ 4" },
                { id: 4, morning: false, afternoon: false, evening: false, dayName: "Thứ 5" },
                { id: 5, morning: false, afternoon: false, evening: false, dayName: "Thứ 6" },
                { id: 6, morning: false, afternoon: false, evening: false, dayName: "Thứ 7" },
                { id: 7, morning: false, afternoon: false, evening: false, dayName: "Chủ nhật" }]
        }
    }

    onChangeFreeTime = (id, name, value) => {
        console.log('value: ', value);
        console.log('name: ', name);
        console.log('id: ', id);
        this.setState(prevState => ({
            lstFreeTime: prevState.lstFreeTime.map(
            obj => (obj.id === id ? Object.assign(obj, { [name]: value }) : obj)
          )
        }));
    }
    
    

    render() {

        return (
            <div className="bg-color">
                <div className="p-5 mx-5">
                    <Grid container spacing={3}>
                        <ThongTinCaNhan />
                        <ThongTinHoSo lstFreeTime={this.state.lstFreeTime} 
                        onChangeFreeTime={this.onChangeFreeTime} />
                    </Grid>
                </div>
            </div>
        );
    }
}

export default HoSoGiaSu;