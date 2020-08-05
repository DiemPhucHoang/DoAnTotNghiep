import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import notfound from './notfound.png';

class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <Header history={this.props.history} />
                <div className="p-5 mx-5">
                <img alt="logo" src={notfound} style={{width: "500px", marginLeft: "350px"}}></img>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;