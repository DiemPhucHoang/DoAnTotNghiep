import React, { Component } from 'react';
import {
    Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import callApi from '../../utils/apiCaller';
import { notification } from "antd";
import "antd/dist/antd.css";

class DialogDanhGia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starOne: false,
            starTwo: false,
            starThree: false,
            starFour: false,
            starFive: false,
            comment: ''
        }
    }

    onClickStar = (name) => {
        this.setState({
            [name]: !this.state[name]
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let number = 0;
        if(this.state.starOne) {
            number++;
        }
        if(this.state.starTwo) {
            number++;
        }
        if(this.state.starThree) {
            number++;
        }
        if(this.state.starFour) {
            number++;
        }
        if(this.state.starFive) {
            number++;
        }
        
        const {phone, idTutor} = this.props;
        let rateVO = {
            star: number,
            comment: this.state.comment,
            phone: phone,
            idTutor: idTutor
        }
        callApi(`rate`, "POST", rateVO).then(res => {
            if (res.status === 200 && res.data.success) {
                notification.success({
                    message: "Success",
                    description: "Đánh giá thành công!"
                  });
            }
          }).catch(error => {
            console.log("Error: ", error);
        });
        this.props.onCloseDialogRating();
    }

    onChange = (e) => {
        this.setState({
            comment: e.target.value
        });
    }

    render() {
        let lstStar = [
            { id: 1, name: 'starOne'},
            { id: 2, name: 'starTwo'},
            { id: 3, name: 'starThree'},
            { id: 4, name: 'starFour'},
            { id: 5, name: 'starFive'}
        ]

        const {idTutor} = this.props;
        console.log('idTutor: ', idTutor);

        return (
            <Dialog
                open={this.props.openRating}
                onClose={this.props.onCloseDialogRating}
                fullWidth
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Đánh giá gia sư
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={3} style={{ padding: "20px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}></Grid>
                                <Grid item xs={9}>
                                    {lstStar.map((star, index) => (
                                        this.state[star.name] ? 
                                        <IconButton key={index} aria-label="star" onClick={() => this.onClickStar(star.name)}>
                                            <StarIcon fontSize="large" style={{ fill: "#EE4D2D" }} />
                                        </IconButton> :
                                        <IconButton key={index} aria-label="star" onClick={() => this.onClickStar(star.name)}>
                                            <StarBorderIcon fontSize="large" style={{ fill: "#EE4D2D" }} />
                                        </IconButton>
                                    ))}

                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth 
                                    label="Nhận xét"
                                    multiline
                                    rowsMax={4}
                                    name="comment"
                                    onChange={this.onChange}
                                />
                                </Grid>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <Button variant="contained" onClick={this.props.onCloseDialogRating}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                Gửi đánh giá
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog >

        );
    }
}

export default DialogDanhGia;