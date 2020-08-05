import React, { Component } from 'react';
import {Grid} from '@material-ui/core';

class DanhSachLopMoi extends Component {


    showInfoClass = () => {

    }
    render() {
        return (
            <Grid container spacing={3}>
                {this.props.children}
            </Grid>
        );
    }
}

export default DanhSachLopMoi;