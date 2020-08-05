import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ThongTinChung from './../components/chiTietGiaSu/ThongTinChung';
import ThongTinChiTiet from './../components/chiTietGiaSu/ThongTinChiTiet';
import { connect } from 'react-redux';
import { actFetchTutorDetailRequest } from '../actions/tutor';
import { actFetchRatesRequest } from '../actions/rate';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ChiTietGiaSu extends Component {
    componentDidMount() {
        const { match } = this.props;
        if (match) {
            const id = match.params.id;
            const chooseTutor = false;
            this.props.onFetchTutorDetail(id, chooseTutor);
            this.props.onFetchRate(id);
        }
    }

    chooseTutor = id => {
        this.props.history.push({
            pathname: '/chon-gia-su',
            state: { tutorId: id }
        })
    }

    render() {
        const { tutor, rate } = this.props;
        return (
            <div>
                <Header />
                <div className="bg-color">
                    <div className="p-5 mx-5">
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <ThongTinChung rate={rate} tutorDetail={tutor} chooseTutor={this.chooseTutor} />
                            </Grid>
                            <Grid item xs={8}>
                                <ThongTinChiTiet tutorDetail={tutor} rate={rate} />
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tutor: state.tutor,
        rate: state.rate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchTutorDetail: (id, chooseTutor) => {
            dispatch(actFetchTutorDetailRequest(id, chooseTutor));
        },
        onFetchRate: (idTutor) => {
            dispatch(actFetchRatesRequest(idTutor));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietGiaSu);