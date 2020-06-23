import React from 'react';
import './App.css';
import Home from './pages/Home';
import PhuHuynh from './pages/PhuHuynh';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ChonGiaSu from './pages/ChonGiaSu';
import DangKyLamGiaSu from './pages/DangKyLamGiaSu';
import LopMoi from './pages/LopMoi';
import DanhGiaGiaSu from './pages/DanhGiaGiaSu';
import ChiTietGiaSu from './pages/ChiTietGiaSu';
import HoSoGiaSu from './pages/HoSoGiaSu';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/tim-gia-su" exact={true} component={PhuHuynh} />
        <Route path="/lam-gia-su" exact={true} component={DangKyLamGiaSu} />
        <Route path="/chon-gia-su" exact={true} component={ChonGiaSu} />
        <Route path="/lop-moi" exact={true} component={LopMoi} />
        <Route path="/danh-gia-gia-su" exact={true} component={DanhGiaGiaSu} />
        <Route path="/chi-tiet-gia-su" exact={true} component={ChiTietGiaSu} />
        <Route path="/ho-so-gia-su" exact={true} component={HoSoGiaSu} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
