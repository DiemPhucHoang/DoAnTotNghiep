import React, { Component } from 'react';
import { Link, Button } from '@material-ui/core';
import {PlayArrow} from '@material-ui/icons';

const FirstPart = () => (
    <div className="p-5 mx-5" style={{overflow:"hidden"}}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 animated zoomIn">
                    <img className="img-fluid" src="image/ttgs.png" alt="ttgs"></img>
                </div>
                <div className="col-md-6">
                    <h1 className="animated bounceInDown" style={{animationDelay:"0.3s"}}>
                        Trung tâm gia sư Ánh Dương
                    </h1>
                    <p className=" animated bounceInRight" style={{ fontSize: "20px",animationDelay:"0.8s", marginTop:"30px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus tincidunt erat pellentesque venenatis. 
                        Maecenas molestie quis sem nec laoreet.
                    </p>
                    <p   className=" animated bounceInRight" style={{ fontSize: "0.9rem",animationDelay:"1s", marginTop:"20px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <Link href="/lienhe">
                        <Button variant="contained" startIcon={<PlayArrow />}  className="animated bounceInRight" style={{ fontSize: "1rem",animationDelay:"1.2s", marginTop:"20px" }} color="secondary" >
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
                        Duis rutrum tristique mauris eget pharetra.
                    </p>
                    <Link href="/phuhuynh">
                        <Button variant="contained" color="secondary" startIcon={<PlayArrow />}>
                            Tìm gia sư
                        </Button>
                    </Link>
                </div>
                <img className="card-img-bottom d-block mx-auto my-4" src="image/test.png" alt="1st card" style={{ width: '60%', height: 'auto' }} />
            </div>
            <div className="card shadow p-4" style={{ borderRadius: '30px' }}>
                <img className="card-img-top d-block mx-auto my-4" src="image/profile.png" alt="2nd card" style={{ width: '60%', height: 'auto' }} />
                <div className="card-body">
                    <h1 className="card-title">Trở thành gia sư</h1>
                    <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
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
        <style jsx="true">
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

class Home extends Component {
    
    render() {
        return (
            <div>
                <FirstPart/>
                <SecondPart/>
            </div>
        );
    }
}

export default Home;