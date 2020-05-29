import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="box">
                <img className="bg" src="image/footer.png" />
                <div className="content">
                    <img src="image/logo.png" style={{ height: '90px', marginTop: '-80px', marginRight: '0' }}></img>
                    <p>
                        <p>
                            Địa chỉ: 01 - Võ Văn Ngân - Quận Thủ Đức - TPHCM
                        </p>
                        <p>
                            Điện thoại: 0987-654-4321
                        </p>
                    </p>
                </div>
                <style jsx>{`
                    .bg{
                        width: 100%;
                        height: 250px;
                    }
                    .box{
                        padding-top: 50px;
                        position: relative;
                    }
                    .content{
                        position: absolute;
                        top:170px;
                        left: 6rem; 
                    }
                `}
                </style>                      
             </div>
        );
    }
}

export default Footer;