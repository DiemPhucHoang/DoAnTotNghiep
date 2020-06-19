import React, { Component } from "react";
import { Grid } from "@material-ui/core";

class DanhSachGiaSu extends Component {
    render() {
        return (
            <Grid container spacing={3}>
                {this.props.children}
            </Grid>
        );
    }
}

export default DanhSachGiaSu;
