import React, { Component } from 'react';
import "./Footer.css";
import footer from './footer.png';
import logo from './logo.png';

class Footer extends Component {
    render() {
        return (
            <div className="box">
                <img alt="footer" className="bg" src={footer} />
                <div className="content">
                    <img alt="logo" src={logo} style={{ height: '90px', marginTop: '-80px', marginRight: '0' }}></img>
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