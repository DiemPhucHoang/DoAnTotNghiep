import React, { Component } from 'react';
import GiaSuNoiBat from './../components/home/GiaSuNoiBat';
import LopNoiBat from './../components/home/LopNoiBat';
import FirstPart from './../components/home/FirstPart';
import SecondPart from'./../components/home/SecondPart';
import callApi from './../utils/apiCaller';
import {connect} from 'react-redux';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClassesTop: [],
            listTutorsTop: []
        }
    }

    componentDidMount() {
        callApi('class/top4', 'GET', null).then(res => {
            if(res.status === 200 && res.data.success) {
                this.setState({
                    listClassesTop: res.data.result
                });
            }
        }).catch(error => {
            console.log(error);
        });

        callApi('tutor/top4', 'GET', null).then(res => {
            if(res.status === 200 && res.data.success) {
                this.setState({
                    listTutorsTop: res.data.result
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    chooseTutor = id => {
        this.props.history.push({
            pathname: '/chon-gia-su',
            state: {tutorId: id}
        })
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            <div>
                <FirstPart />
                {isAuthenticated ? "" : <GiaSuNoiBat tutorList={this.state.listTutorsTop} chooseTutor={this.chooseTutor}/>}
                {isAuthenticated ? "" : <SecondPart />}
                <LopNoiBat classList={this.state.listClassesTop} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(Home);