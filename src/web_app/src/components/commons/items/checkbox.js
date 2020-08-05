import React, { Component } from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';
class checkbox extends Component {
    onChange = (e) => {
        const {name, checked} = e.target;
        this.props.onChange(name, checked);
    }

    render() {
        const {object, itemName} = this.props;
        return (
            <Grid item xs={3}>
                <FormControlLabel
                    value={object.id}
                    control={<Checkbox checked={object.status} 
                    name={object.id + ""}
                    onChange={this.onChange} />}
                    label={object[itemName]}
                />
            </Grid>
        );
    }
}

export default checkbox;