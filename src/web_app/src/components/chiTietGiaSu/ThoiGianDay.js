import React, { Component } from 'react';
import NgayDay from './NgayDay';

class ThoiGianDay extends Component {

    compare = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const bandA = a.dayName.toUpperCase();
        const bandB = b.dayName.toUpperCase();
      
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }
      
      
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