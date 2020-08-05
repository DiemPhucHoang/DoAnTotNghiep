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
                                Trung tâm gia sư Ánh Dương cam kết mang đến cho mọi người dịch vụ gia sư tại nhà hoàn hảo nhất. Chúng tôi đã và đang giúp đỡ
                                hàng nghìn gia sư có việc làm và hàng nghìn học sinh tiến bộ vượt bậc.
                            </p>
                            <p className=" animated bounceInRight" style={{ fontSize: "0.9rem", animationDelay: "1s", marginTop: "20px" }}>
                                Hãy liên hệ với chúng tôi!
                            </p>
                            <Link to="/">
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