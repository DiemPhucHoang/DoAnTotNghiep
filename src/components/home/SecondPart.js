import React, { Component } from 'react';
import { Button} from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class SecondPart extends Component {
    render() {
        return (
            <div className="second-part p-5">
                <div className="card-deck mx-5 py-5">
                    <div className="card shadow p-4 " style={{ borderRadius: '30px' }}>
                        <div className="card-body ">
                            <h1 className="card-title">Tìm kiếm gia sư</h1>
                            <p className="card-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus tincidunt erat pellentesque venenatis.
                                Maecenas molestie quis sem nec laoreet. Nam tellus orci, tincidunt vitae massa ac, auctor dignissim nulla.
                            </p>
                            <Link to="/tim-gia-su">
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
                            <Link to="/lam-gia-su">
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

        );
    }
}

export default SecondPart;