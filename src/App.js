import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import PhuHuynh from './pages/PhuHuynh';
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ChonGiaSu from './pages/ChonGiaSu';
import DangKyLamGiaSu from './pages/DangKyLamGiaSu';
import ChiTietGiaSu from './pages/ChiTietGiaSu';
import DanhGiaGiaSu from './pages/DanhGiaGiaSu';
import LopMoi from './pages/LopMoi';
import HoSoGiaSu from './pages/HoSoGiaSu';
import DangKyDay from './pages/DangKyDay';
import DangNhap from './pages/DangNhap';
import LopDaDangKy from './pages/LopDaDangKy';
import { notification } from "antd";
import { connect } from "react-redux";
import LoadingSpinerComponent from "./components/commons/loading";
import DoiMatKhau from './pages/DoiMatKhau';
import { BackTop } from "antd";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          React.createElement(component, { ...props })
        ) : (
            <Redirect to="/login" />
          );
      }}
    />
  );
};

class App extends Component {
  render() {
    notification.config({
      duration: 3
    });
    const { isAuthenticated } = this.props.auth;
    return (
      <Router>
        <Header />
        <LoadingSpinerComponent />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/tim-gia-su" exact={true} component={PhuHuynh} />
          <Route path="/lam-gia-su" exact={true} component={DangKyLamGiaSu} />
          <Route path="/chon-gia-su" exact={true} component={ChonGiaSu} />
          <Route path="/lop-moi" exact={true} component={LopMoi} />
          <Route path="/danh-gia-gia-su" exact={true} component={DanhGiaGiaSu} />
          <Route path="/chi-tiet-gia-su/:id" exact={true} component={ChiTietGiaSu} />
          <Route path="/recovery-password/:token" exact={true} component={DoiMatKhau}/>
          <PrivateRoute 
            path="/ho-so-gia-su" 
            exact={true} 
            component={HoSoGiaSu} 
            isAuthenticated={isAuthenticated}/>
          <PrivateRoute 
            path="/dang-ky-day/:id" 
            exact={true} 
            component={DangKyDay} isAuthenticated={isAuthenticated} />
          <PrivateRoute 
            path="/lop-da-dang-ky" 
            exact={true} 
            component={LopDaDangKy} isAuthenticated={isAuthenticated} />

          <Route path="/login" exact={true} component={DangNhap} />
        </Switch>
        <Footer />
        {/* <div>
            <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}> gray </strong>
          </div> */}
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, null)(App);
