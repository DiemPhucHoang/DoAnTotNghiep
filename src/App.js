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

import AdminHome from './pages/admin/AdminHome';
import ClassListPage from './pages/admin/ClassListPage';
import ClassDetail from './pages/admin/ClassDetail';
import ClassActionPage from './pages/admin/ClassActionPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import UserActionPage from './pages/admin/UserActionPage';
import DuyetGiaSuDKLop from './pages/admin/DuyetGiaSuDKLop';
import DuyetGSDKDetail from './pages/admin/DuyetGSDKDetail';
import ReportPage from './pages/admin/ReportPage';
import DuyetPHChonGS from './pages/admin/DuyetPHChonGS';
import DuyetPHChonGSDetail from './pages/admin/DuyetPHChonGSDetail';



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

        <LoadingSpinerComponent />

        {/* <Header/> */}

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

          <PrivateRoute
            path="/admin"
            exact={true}
            component={AdminHome} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/quan-ly-lop"
            exact={true}
            component={ClassListPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/class/:id"
            exact={true}
            component={ClassDetail} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/quan-ly-lop/them-lop"
            exact={true}
            component={ClassActionPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/quan-ly-user"
            exact={true}
            component={UserListPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/quan-ly-user/:id"
            exact={true}
            component={UserEditPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/them-user"
            exact={true}
            component={UserActionPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/duyet-gia-su-dk-lop"
            exact={true}
            component={DuyetGiaSuDKLop} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/duyet-gia-su-dk-lop/:id"
            exact={true}
            component={DuyetGSDKDetail} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/thong-ke-nhan-lop"
            exact={true}
            component={ReportPage} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/duyet-phuynh-chon-giasu"
            exact={true}
            component={DuyetPHChonGS} isAuthenticated={isAuthenticated} />
          <PrivateRoute
            path="/admin/duyet-phuynh-chon-giasu/:id"
            exact={true}
            component={DuyetPHChonGSDetail} isAuthenticated={isAuthenticated} />
        </Switch>

        {/* <Footer /> */}
        {/* <div>
            <BackTop />
            <strong style={{ color: "rgba(64, 64, 64, 0.6)" }}> gray </strong>
          </div> */}

        {/* <Footer /> */}

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
