import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRequest } from './../actions/user';
import Button from '@material-ui/core/Button';
import logo from './logo.png';

class Header extends Component {
    logout = () => {
        let { history } = this.props;
        this.props.onLogout(history);
    }

    render() {
        const MenuLink = (props) => {
            const location = useLocation()
            const path = location.pathname.replace("/", "");
            return (
                <li className="nav-item" style={{ marginRight: '20px' }}>
                    <Link to={`/${props.name}`} className="nav-link" onClick={props.handleClick}
                        style={{ fontSize: "18px", marginBottom: "0px", color: props.name.toLowerCase() === path ? "#f50057" : "black" }} >
                            {props.title}
                    </Link>
                    <div className={props.name.toLowerCase() === path ? "line-show" : "line"}></div>
                </li>
            )
        };
        const { isAuthenticated } = this.props.auth;
        return (
            <nav className="navbar navbar-expand-lg navbar-light container">
                <Link className="navbar-brand" to="/" style={{ marginRight: '50px' }}>
                    <img alt="logo" style={{ height: '100px' }} src={logo}></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? <ul className="navbar-nav mr-auto">
                        <MenuLink {...this.props} title="TRANG CHỦ" name="" />
                        <MenuLink {...this.props} title="LỚP MỚI" name="lop-moi" />
                        <MenuLink {...this.props} title="LỚP ĐÃ ĐĂNG KÝ" name="lop-da-dang-ky" />
                        <MenuLink {...this.props} title="HỒ SƠ GIA SƯ" name="ho-so-gia-su" />
                        <li className="nav-item" style={{ marginRight: '20px' }}>
                            <Button
                                className="nav-link"
                                onClick={this.logout}
                                style={{ fontSize: "18px", marginBottom: "0px", color: "black" }}
                            >
                                ĐĂNG XUẤT
                            </Button>
                        </li>
                        </ul> : <ul className="navbar-nav mr-auto">
                            <MenuLink {...this.props} title="TRANG CHỦ" name="" />
                            <MenuLink {...this.props} title="TÌM GIA SƯ" name="tim-gia-su" />
                            <MenuLink {...this.props} title="LÀM GIA SƯ" name="lam-gia-su" />
                            <MenuLink {...this.props} title="LỚP MỚI" name="lop-moi" />
                            <MenuLink {...this.props} title="ĐÁNH GIÁ" name="danh-gia-gia-su" />
                            <MenuLink {...this.props} title="ĐĂNG NHẬP" name="login" />
                        </ul>}
                </div>
            </nav>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (history) => {
            dispatch(logoutRequest(history));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);