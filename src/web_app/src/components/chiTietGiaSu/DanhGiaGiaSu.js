import React, { Component } from 'react';
import { Grid, Avatar } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

class DanhGiaGiaSu extends Component {

    generateStar = (star) => {
        let result = <> </>
        switch (star) {
            case 1:
                result = <div><StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
                break;
            case 2:
                result = <div><StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
                break;
            case 3:
                result = <div><StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
                break;
            case 4:
                result = <div><StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
                break;
            case 5:
                result = <div><StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
                break;
            default:
                result = <div><StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                    <StarBorderIcon fontSize="small" style={{ fill: "#EE4D2D" }} />
                </div>
        }
        return result;
    }

    render() {
        const { rate } = this.props;
        const hasRate = rate && rate.length > 0;
        return (
            <div style={{ padding: '20px' }}>
                {hasRate && rate.map((item, index) => (
                    <Grid container spacing={3} key={index}>
                        <Grid item xs={1}>
                            <Avatar style={{ width: '50px', height: '50px' }} src="image/av3.png" ></Avatar>
                        </Grid>
                        <Grid item xs={11}>
                            <h5>{item.name} <small><i>Đã nhận xét vào {item.time}</i></small></h5>
                            {this.generateStar(item.star)}
                            <p style={{ marginTop: "10px" }}>{item.comment}</p>
                        </Grid>
                    </Grid>
                ))}
            </div>
        );
    }
}

export default DanhGiaGiaSu;