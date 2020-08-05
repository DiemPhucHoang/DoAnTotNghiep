import React, { Component } from 'react';
import cookie from 'js-cookie';
import { logoutRequest } from '../../actions/user';
import { connect } from 'react-redux';

class Nav extends Component {
    onRefresh = () => {
        window.location.reload();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <a className="navbar-brand mr-1" href="/admin">GIA SƯ ÁNH DƯƠNG</a>
                    <button className="btn btn-link btn-sm text-white ">
                        <i className="fas fa-bars" />
                    </button>
                    <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
                        <li className="nav-item dropdown no-arrow">  
                            <a className="nav-link dropdown-toggle" style={{textAlign: 'center'}} onClick={this.handleLogout}>
                                <i className="fas fa-user-circle fa-fw" style={{fontSize: '20px', color: 'white'}}/>
                                <br/>Đăng xuất
                            </a>
                        </li>
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" style={{textAlign: 'center'}} onClick={this.onRefresh}>
                                <i className="fas fa-sync-alt" style={{fontSize: '20px', color: 'white'}}/>
                                <br/>Refresh
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    handleLogout = (e) => {
        e.preventDefault()
        let { history } = this.props;
        this.props.onLogout(history);
    }   
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: (history) => {
            dispatch(logoutRequest(history));
        }
    };
}

export default connect(null, mapDispatchToProps)(Nav);