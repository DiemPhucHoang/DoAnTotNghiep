import React, { Component } from 'react';
import NgayDay from './NgayDay';

class ThoiGianDay extends Component {
    render() {
        const { freeTimes } = this.props;
        const hasFreeTimes = freeTimes && freeTimes.length > 0;
        return (
            <div>
                <div className="gblock-v2">
                    <div className="body-block block-calender">
                        {hasFreeTimes && freeTimes.map((freeTime) => (
                            <NgayDay key={freeTime.id} freeTime={freeTime}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ThoiGianDay;