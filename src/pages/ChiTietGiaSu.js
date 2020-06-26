import React, { Component } from 'react';
import { Grid} from '@material-ui/core';
import ThongTinChung from './../components/chiTietGiaSu/ThongTinChung';
import ThongTinChiTiet from './../components/chiTietGiaSu/ThongTinChiTiet';
import { connect } from 'react-redux';
import {actFetchTutorDetailRequest} from './../actions/tutor';

class ChiTietGiaSu extends Component {
    componentDidMount() {
        const {match} = this.props;
        if(match) {
            const id = match.params.id;
            const chooseTutor = false;
            this.props.onFetchTutorDetail(id, chooseTutor);
        }
    }

    chooseTutor = id => {
        this.props.history.push({
            pathname: '/chon-gia-su',
            state: {tutorId: id}
        })
    }
    
    render() {
        let {tutor} = this.props;
        return (
            
            <div className="bg-color">
                <div className="p-5 mx-5">
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <ThongTinChung tutorDetail={tutor} chooseTutor={this.chooseTutor}/>
                        </Grid>
                        <Grid item xs={8}>
                            <ThongTinChiTiet tutorDetail={tutor} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tutor: state.tutor
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onFetchTutorDetail: (id, chooseTutor) => {
        dispatch(actFetchTutorDetailRequest(id, chooseTutor));
      }
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ChiTietGiaSu);