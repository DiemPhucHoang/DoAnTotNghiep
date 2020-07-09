import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class NgayDay extends Component {

    render() {
        let { freeTime } = this.props;
        let colorMorning = freeTime.morning === true ? 'secondary' : 'default';
        let colorAfternoon = freeTime.afternoon === true ? 'secondary' : 'default';
        let colorEvening = freeTime.evening === true ? 'secondary' : 'default';
        return (
            <div className="row-calendar">
                <p className="mr-30">{freeTime.dayName}</p>
                <ul>
                    <li className="calendar-normal">
                        <Button variant="contained" size="small" color={colorMorning} disableElevation>Sáng</Button>
                    </li>
                    <li className="calendar-normal">
                        <Button variant="contained" size="small" color={colorAfternoon} disableElevation>Chiều</Button>
                    </li>
                    <li className="calendar-normal">
                        <Button variant="contained" size="small" color={colorEvening} disableElevation>&ensp;Tối&ensp;&ensp;</Button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NgayDay;