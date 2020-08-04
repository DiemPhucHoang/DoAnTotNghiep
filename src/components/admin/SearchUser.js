import React, { Component } from 'react';
import {
    Grid, TextField, MenuItem, Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import { actSearchInputUserRequest } from './../../actions/user';

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: ""
        }
    }

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { name, phone } = this.state;
        let search = {
            name: name,
            phone: phone,
            isSearch: true
        }
        this.props.onSearchUsers(search);
        this.props.onSearchInputUser(search);
    }

    render() {
        return (
            <Grid container spacing={3} style={{ padding: "15px" }}>
                <Grid item xs={12}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-currency"
                                    label="Họ tên"
                                    name="name"
                                    onChange={this.onChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={this.state.name}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="standard-select-currency"
                                    label="Số điện thoại"
                                    name="phone"
                                    onChange={this.onChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={this.state.phone}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button label="Submit" type="submit" variant="contained" color="secondary" fullWidth>
                                    Tìm kiếm
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchInputUser: (search) => {
            dispatch(actSearchInputUserRequest(search));
        }
    };
};

export default connect(null, mapDispatchToProps)(SearchUser);