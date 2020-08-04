import React, { Component } from 'react';
import {
    Card, Typography, AppBar, Toolbar, IconButton,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import GiaSuDaChon from "./../components/chonGiaSu/GiaSuDaChon";
import DangKyChonGiaSu from "./../components/chonGiaSu/DangKyChonGiaSu";
import { connect } from 'react-redux';
import callApi from "./../utils/apiCaller";
import { actFetchTutorDetailRequest } from './../actions/tutor';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ChonGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            districts: [],
            classTeaches: [],
        }
    }

    componentDidMount() {
        const chooseTutor = true
        this.props.onFetchTutorDetail(this.props.location.state.tutorId, chooseTutor);
        this.getAll();
    }

    getAll = () => {
        callApi('subject', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    subjects: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
        callApi('district', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    districts: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
        callApi('class-teach', "GET", null).then(res => {
            if (res.status === 200) {
                this.setState({
                    classTeaches: res.data.result
                })
            }
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const {tutor} = this.props;
        let { subjects, districts, classTeaches } = this.state;
        const {history} = this.props;
        return (
            <div>
                <Header/>
                <div className="bg-color">
                    <br />
                    <div className="container ">
                        <Card elevation={3}>
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <Menu />
                                    </IconButton>
                                    <Typography color="inherit">
                                        GIA SƯ ĐÃ CHỌN
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <GiaSuDaChon tutorItem={tutor} />
                            <AppBar position="static">
                                <Toolbar variant="dense">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <Menu />
                                    </IconButton>
                                    <Typography color="inherit">
                                        ĐIỀN THÔNG TIN ĐĂNG KÝ CHỌN GIA SƯ
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <DangKyChonGiaSu
                                tutorItem={tutor}
                                subjects={subjects}
                                districts={districts}
                                classTeaches={classTeaches}
                                history={history}
                            />
                            <br /><br />
                        </Card>
                    </div>
                </div>
                <Footer/>
            </div>
            

        );
    }
}

const mapStateToProps = (state) => {
    return {
        tutor: state.chooseTutor
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTutorDetail: (id, chooseTutor) => {
            dispatch(actFetchTutorDetailRequest(id, chooseTutor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChonGiaSu);