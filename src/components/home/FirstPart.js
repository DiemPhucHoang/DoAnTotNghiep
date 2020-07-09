import React, { Component } from 'react';
import { Link, Button} from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';

class FirstPart extends Component {
    render() {
        return (
            <div className="p-5 mx-5" style={{ overflow: "hidden" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 animated zoomIn" style={{ textAlign: "center" }}>
                            <img alt="ttgs" className="img-fluid" src="image/ttgs.png" style={{ width: '80%' }}></img>
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

        );
    }
}

export default FirstPart;