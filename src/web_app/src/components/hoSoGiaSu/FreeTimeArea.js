import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class FreeTimeArea extends Component {

    handleClickButtonFreeTime = (id, name, value) => {
        this.props.onChangeFreeTime(id, name, !value);
    }

    render() {
        const { freeTime } = this.props;
        return (
            <div className="row-calendar">
            <p className="mr-30">{freeTime.dayName}</p>
            <ul>
                <li className="calendar-normal">
                    <Button variant="contained" size="small" name="morning"
                        color={freeTime.morning ? "secondary" : "default"}
                        onClick={() => this.handleClickButtonFreeTime(freeTime.id, "morning", freeTime.morning)}
                    >
                        Sáng</Button>
                </li>
                <li className="calendar-normal">
                    <Button variant="contained" size="small" name="afternoon"
                        color={freeTime.afternoon ? "secondary" : "default"}
                        onClick={() => this.handleClickButtonFreeTime(freeTime.id, "afternoon", freeTime.afternoon)}
                    >
                        Chiều</Button>
                </li>
                <li className="calendar-active">
                    <Button variant="contained" size="small" name="evening"
                        color={freeTime.evening ? "secondary" : "default"}
                        onClick={() => this.handleClickButtonFreeTime(freeTime.id, "evening", freeTime.evening)}
                    >
                        &ensp;&nbsp;Tối&ensp;&nbsp;</Button>
                </li>
            </ul>
        </div>
        );
    }
}

export default FreeTimeArea;