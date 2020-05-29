import React from 'react';
import './App.css';
import Home from './pages/Home';
import PhuHuynh from './pages/PhuHuynh';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ChonGiaSu from './pages/ChonGiaSu';
import DangKyLamGiaSu from './pages/DangKyLamGiaSu';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/tim-gia-su" exact={true} component={PhuHuynh} />
        <Route path="/lam-gia-su" exact={true} component={DangKyLamGiaSu} />
        <Route path="/chon-gia-su" exact={true} component={ChonGiaSu} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
