import React, { Component } from 'react';
import { Card } from '@material-ui/core';

class DangKyLamGiaSu extends Component {
    render() {
        return (
            <div className="bg-color">
                <br />
                <div className="container ">
                    <Card elevation={3}>
                        <p>Gia sư</p>
                    </Card>
                </div>
            </div>
        );
    }
}

export default DangKyLamGiaSu;