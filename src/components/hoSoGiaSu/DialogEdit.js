import React, { Component } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

class DialogEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          JSON.stringify(this.props.user) !==
          JSON.stringify(prevProps.user)
        ) {
          this.setState({ 
            user: this.props.user
           });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editInfoTutor(this.state.user);
        this.props.onCloseEditTutor();
    }

    onChange = (e) => {
        let {name, value} = e.target;
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
    }

    render() {
        let { user } = this.state;
        return (
            <Dialog
                open={this.props.openEditTutor}
                onClose={this.props.onCloseEditTutor}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Chỉnh sửa thông tin gia sư
                    </DialogTitle>
                <DialogContent>
                    {user &&
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={3} style={{ padding: "20px" }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="standard-select-currency"
                                            name="name"
                                            value={user.name}
                                            label="Họ tên"
                                            variant="outlined"
                                            size="small"
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            type="number"
                                            id="standard-select-currency"
                                            name="phone"
                                            value={user.phone}
                                            label="Số điện thoại"
                                            variant="outlined"
                                            size="small"
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="standard-select-currency"
                                            name="address"
                                            value={user.address}
                                            label="Địa chỉ"
                                            variant="outlined"
                                            size="small"
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="standard-select-currency"
                                            name="email"
                                            value={user.email}
                                            label="Email"
                                            variant="outlined"
                                            size="small"
                                            onChange={this.onChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button variant="contained" onClick={this.props.onCloseEditTutor}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    }
                </DialogContent>
            </Dialog >
        );
    }
}

export default DialogEdit;