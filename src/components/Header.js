import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'

const MenuLink = (props) => {
    const location = useLocation()
    const path = location.pathname.replace("/","");
    console.log(path)
    return (
        <li className="nav-item" style={{marginRight: '20px'}}>
            <a href={`/${props.name}`} className="nav-link" onClick={props.handleClick}
                style={{ fontSize: "18px",marginBottom: "0px", color: props.name.toLowerCase() === path ? "#f50057" : "black" }} >
                {props.title}
            </a>
            <div className={props.name.toLowerCase() === path ? "line-show" : "line"}></div>
        </li>
    )
};

class Header extends Component {
    render() {       
        return (
            <nav className="navbar navbar-expand-lg navbar-light container">
                <a className="navbar-brand" href="/" style={{marginRight: '50px'}}>
                    <img style={{ height: '100px' }} src="image/logo.png"></img>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <MenuLink {...this.props} title="TRANG CHỦ" name="" />
                        <MenuLink {...this.props} title="TÌM GIA SƯ" name="tim-gia-su" />
                        {/* <MenuLink {...this.props} title="Đánh giá gia sư" name="danh-gia-gia-su" /> */}
                        <MenuLink {...this.props} title="LÀM GIA SƯ" name="lam-gia-su" />
                        <MenuLink {...this.props} title="LỚP MỚI" name="lop-moi" />
                        <MenuLink {...this.props} title="ĐĂNG NHẬP" name="lien-he" />
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;