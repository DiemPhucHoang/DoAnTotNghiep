import React, { Component } from 'react';
import { Button, Grid, Paper, Card, CardActionArea, CardContent, Typography, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

class GiaSuNoiBat extends Component {
    chooseTutor = (id) => {
        this.props.chooseTutor(id);
    }
    render() {
        const { tutorList } = this.props;
        const hasTutorList = tutorList && tutorList.length > 0;
        return (
            <div className="p-5 mx-5">
                <Paper elevation={0}>
                    <h4 style={{ textAlign: "center" }}>GIA SƯ NỔI BẬT</h4>
                    <Grid container spacing={3} style={{ padding: '10px' }}>
                        {hasTutorList && tutorList.map((tutorItem) => (
                            <Grid key={tutorItem.id} item xs={3} className="paper">
                                <Card elevation={3} style={{ padding: '5px'}}>
                                    <CardActionArea>
                                        <div style={{ textAlign: 'center', padding: '15px' }}>
                                            <img alt="avatar" src={`data:image/jpg;base64,${tutorItem.image}`} className="rounded-circle" style={{ width: '55%' }} />
                                        </div>
                                        <CardContent>
                                            <Typography gutterBottom variant="subtitle1" component="h2">
                                                {tutorItem.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {tutorItem.level} <br />
                                                {tutorItem.college}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Link to={`/chi-tiet-gia-su/${tutorItem.id}`}>
                                            <Button variant="contained" color="primary" size="small">
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                size="small" 
                                                style={{ marginLeft: '15px' }}
                                                onClick={(e, id) => this.chooseTutor(tutorItem.id)}>
                                                Mời dạy
                                            </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </Paper>
                <Link to="/tim-gia-su" style={{ float: 'right' }}>
                    <b> Xem thêm</b>
                </Link>
            </div>

        );
    }
}

export default GiaSuNoiBat;