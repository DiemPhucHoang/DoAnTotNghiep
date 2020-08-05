import React, { Component } from 'react';
import { Grid, Button, TextField, Card } from '@material-ui/core';
import { validatePhone } from '../../constants/validate';

class FormDanhGiaGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            errPhone: ''
        }
    }
    onHandleSubmit = (e) => {
        e.preventDefault();
        this.props.showTutorRating(this.state.phone);
    }
    
    onChange = (e) => {
        let {value} = e.target;
        this.setState({
            phone: value
        })
    }

    validateField = (value, errName) => {
        if(errName ==='errPhone') {
            let err = validatePhone(value);
            this.setState({
                errPhone: err
            })
        }       
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <img alt="rating" style={{ width: "90%" }} src="image/rate.png" />
                </Grid>
                <Grid item xs={6}>
                    <Card variant="elevation" elevation={3} style={{ padding: '30px' }}>
                        <h4 style={{ textAlign: "center" }}>ĐÁNH GIÁ GIA SƯ</h4>
                        <i>Quý phụ huynh vui lòng nhập số điện thoại đã cung cấp cho trung tâm gia sư Ánh Dương để tìm gia sư muốn đánh giá.</i>
                        <form onSubmit={this.onHandleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Số điện thoại"
                                        name="phone"
                                        type="number"
                                        onChange={this.onChange}
                                        onBlur={() => this.validateField(this.state.phone, 'errPhone')}
                                    />
                                    {(this.state.errPhone !=='') ? <p style={{color: "red"}}>{this.state.errPhone}</p> : ''}
                                </Grid>
                            </Grid>
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <Button type="submit" variant="contained" color="secondary" >
                                    Tìm gia sư
                                </Button>
                            </div>
                        </form>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

export default FormDanhGiaGiaSu;