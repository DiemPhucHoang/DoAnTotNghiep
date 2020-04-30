import React from 'react';
import './App.css';
import Home from './pages/Home';
import PhuHuynh from './pages/PhuHuynh';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/phuhuynh" exact={true} component={PhuHuynh} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
