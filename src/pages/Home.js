import React, { Component } from 'react';
import { Link, Button, Grid, Paper, Container, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, AppBar, Toolbar } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';

const FirstPart = () => (
    <div className="p-5 mx-5" style={{ overflow: "hidden" }}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 animated zoomIn" style={{ textAlign: "center" }}>
                    <img className="img-fluid" src="image/ttgs.png" style={{ width: '80%' }}></img>
                </div>
                <div className="col-md-6">
                    <h1 className="animated bounceInDown" style={{ animationDelay: "0.3s" }}>
                        Trung tâm gia sư Ánh Dương
                    </h1>
                    <p className=" animated bounceInRight" style={{ fontSize: "20px", animationDelay: "0.8s", marginTop: "30px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus tincidunt erat pellentesque venenatis.
                        Maecenas molestie quis sem nec laoreet.
                    </p>
                    <p className=" animated bounceInRight" style={{ fontSize: "0.9rem", animationDelay: "1s", marginTop: "20px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <Link href="/lienhe">
                        <Button variant="contained" startIcon={<PlayArrow />} className="animated bounceInRight" style={{ fontSize: "1rem", animationDelay: "1.2s", marginTop: "20px" }} color="secondary" >
                            Liên hệ với chúng tôi
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    </div>
)

const SecondPart = () => (
    <div className="second-part p-5">
        <div className="card-deck mx-5 py-5">
            <div className="card shadow p-4 " style={{ borderRadius: '30px' }}>
                <div className="card-body ">
                    <h1 className="card-title">Tìm kiếm gia sư</h1>
                    <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus tincidunt erat pellentesque venenatis.
                        Maecenas molestie quis sem nec laoreet. Nam tellus orci, tincidunt vitae massa ac, auctor dignissim nulla.
                    </p>
                    <Link href="/phuhuynh">
                        <Button variant="contained" color="secondary" startIcon={<PlayArrow />}>
                            Tìm gia sư
                        </Button>
                    </Link>
                </div>
                <img className="card-img-bottom d-block mx-auto my-4" src="image/test.png" alt="1st card" style={{ width: '40%', height: 'auto' }} />
            </div>
            <div className="card shadow p-4" style={{ borderRadius: '30px' }}>
                <img className="card-img-top d-block mx-auto my-4" src="image/profile.png" alt="2nd card" style={{ width: '40%', height: 'auto' }} />
                <div className="card-body">
                    <h1 className="card-title">Trở thành gia sư</h1>
                    <p className="card-text">
                        In maximus tincidunt erat pellentesque venenatis. Maecenas molestie quis sem nec laoreet.
                        Nam tellus orci, tincidunt vitae massa ac, auctor dignissim nulla. Duis rutrum tristique mauris eget pharetra.
                    </p>
                    <Link href="/giasu">
                        <Button variant="contained" color="secondary" startIcon={<PlayArrow />}>
                            Làm gia sư
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
        <style jsx>
            {`
            .second-part{
                background-image: url('image/second.png');
                background-position: center;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            .card{
                transition: transform 0.5s;
            }
            .card:hover{
                transform: scale(1.05 , 1.05);
                box-shadow: 5px 5px 2px black, -5px -5px 2px black;
            }                   
            `}
        </style>
    </div>
)

const GiaSuNoiBat = () => (
    <div className="p-5 mx-5">
        <Paper elevation={0} >
            <h4 style={{ textAlign: "center" }}>GIA SƯ NỔI BẬT</h4>
            <Grid container spacing={3} style={{ padding: '10px' }}>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} style={{ padding: '5px' }}>
                        <CardActionArea>
                            <div style={{ textAlign: 'center', padding: '15px' }}>
                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '55%' }} />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Nguyễn Thị Kim Dung
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Sinh viên <br />
                                    Đại học Sư phạm kỹ thuật TPHCM
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" color="primary" size="small">
                                Xem chi tiết
                            </Button>
                            <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '35px' }}>
                                Mời dạy
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper" >
                    <Card elevation={3} style={{ padding: '5px' }}>
                        <CardActionArea>
                            <div style={{ textAlign: 'center', padding: '15px' }}>
                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '55%' }} />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Nguyễn Thị Kim Dung
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Sinh viên <br />
                                    Đại học Sư phạm kỹ thuật TPHCM
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" color="primary" size="small">
                                Xem chi tiết
                            </Button>
                            <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '35px' }}>
                                Mời dạy
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} style={{ padding: '5px' }}>
                        <CardActionArea>
                            <div style={{ textAlign: 'center', padding: '15px' }}>
                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '55%' }} />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Nguyễn Thị Kim Dung
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Sinh viên <br />
                                    Đại học Sư phạm kỹ thuật TPHCM
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" color="primary" size="small">
                                Xem chi tiết
                            </Button>
                            <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '35px' }}>
                                Mời dạy
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} style={{ padding: '5px' }}>
                        <CardActionArea>
                            <div style={{ textAlign: 'center', padding: '15px' }}>
                                <img src="image/avata.jpg" className="rounded-circle" style={{ width: '55%' }} />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Nguyễn Thị Kim Dung
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Sinh viên <br />
                                    Đại học Sư phạm kỹ thuật TPHCM
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained" color="primary" size="small">
                                Xem chi tiết
                            </Button>
                            <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '35px' }}>
                                Mời dạy
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
        <Link href="/tim-gia-su" style={{ float: 'right' }}>
            <b> Xem thêm</b>
        </Link>
    </div>
)

const LopNoiBat = () => (
    <div className="p-5 mx-5">
        <Paper elevation={0} >
            <h4 style={{ textAlign: "center" }}>DANH SÁCH LỚP MỚI</h4>
            <Grid container spacing={4} style={{ padding: '10px' }}>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} >
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    Mã lớp: 0123
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent style={{ padding: '10px' }}>
                            <p><b>Lớp dạy: </b> Lớp 5</p>
                            <p><b>Môn dạy: </b> Toán, Tiếng Việt</p>
                            <p><b>Lương: </b> 2.000.000 vnđ</p>
                            <p><b>Thời gian: </b> Thứ 2 4 6, từ 17-19h</p>
                            <p><b>Địa chỉ: </b> Quận Thủ Đức</p>
                            <div style={{ float: "right", paddingBottom: '15px' }}>
                                <Button variant="contained" color="secondary" size="small">
                                    Đăng ký dạy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper" >
                    <Card elevation={3} >
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    Mã lớp: 0123
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent style={{ padding: '10px' }}>
                            <p><b>Lớp dạy: </b> Lớp 5</p>
                            <p><b>Môn dạy: </b> Toán, Tiếng Việt</p>
                            <p><b>Lương: </b> 2.000.000 vnđ</p>
                            <p><b>Thời gian: </b> Thứ 2 4 6, từ 17-19h</p>
                            <p><b>Địa chỉ: </b> Quận Thủ Đức</p>
                            <div style={{ float: "right", paddingBottom: '15px' }}>
                                <Button variant="contained" color="secondary" size="small">
                                    Đăng ký dạy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} >
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    Mã lớp: 0123
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent style={{ padding: '10px' }}>
                            <p><b>Lớp dạy: </b> Lớp 5</p>
                            <p><b>Môn dạy: </b> Toán, Tiếng Việt</p>
                            <p><b>Lương: </b> 2.000.000 vnđ</p>
                            <p><b>Thời gian: </b> Thứ 2 4 6, từ 17-19h</p>
                            <p><b>Địa chỉ: </b> Quận Thủ Đức</p>
                            <div style={{ float: "right", paddingBottom: '15px' }}>
                                <Button variant="contained" color="secondary" size="small">
                                    Đăng ký dạy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3} className="paper">
                    <Card elevation={3} >
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <Typography variant="h6" color="inherit">
                                    Mã lớp: 0123
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <CardContent style={{ padding: '10px' }}>
                            <p><b>Lớp dạy: </b> Lớp 5</p>
                            <p><b>Môn dạy: </b> Toán, Tiếng Việt</p>
                            <p><b>Lương: </b> 2.000.000 vnđ</p>
                            <p><b>Thời gian: </b> Thứ 2 4 6, từ 17-19h</p>
                            <p><b>Địa chỉ: </b> Quận Thủ Đức</p>
                            <div style={{ float: "right", paddingBottom: '15px' }}>
                                <Button variant="contained" color="secondary" size="small">
                                    Đăng ký dạy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
        <Link href="/lop-moi" style={{ float: 'right' }}>
            <b> Xem thêm</b>
        </Link>
    </div>
)

class Home extends Component {

    render() {
        return (
            <div>
                <FirstPart />
                <GiaSuNoiBat />
                <SecondPart />
                <LopNoiBat />
            </div>
        );
    }
}

export default Home;