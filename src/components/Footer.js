import React, { Component } from 'react';
import "./Footer.css";

class Footer extends Component {
    render() {
        return (
            <div className="box">
                <img alt="footer" className="bg" src="image/footer.png" />
                <div className="content">
                    <img alt="logo" src="image/logo.png" style={{ height: '90px', marginTop: '-80px', marginRight: '0' }}></img>
                    <p>
                        <span>
                            Địa chỉ: 01 - Võ Văn Ngân - Quận Thủ Đức - TPHCM
                        </span>
                        <br /><br />
                        <span>
                            Điện thoại: 0987-654-4321
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;