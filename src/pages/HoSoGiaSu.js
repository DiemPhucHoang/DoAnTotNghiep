import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ThongTinCaNhan from './../components/hoSoGiaSu/ThongTinCaNhan';
import ThongTinHoSo from './../components/hoSoGiaSu/ThongTinHoSo';
import {actFetchUserRequest, actChangeInfoUserRequest} from './../actions/user';
import {actFetchTutorByIdUserRequest, actCreateTutorRequest, actChangeInfoTutorRequest} from './../actions/tutor';
import { connect } from "react-redux";
import { freeTimeConst, subjectConst, districtConst, classTeachConst } from '../constants/tutor';
import _ from 'lodash';
import callApi from '../utils/apiCaller';
import { notification } from "antd";
import "antd/dist/antd.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

class HoSoGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstFreeTime : [],
            subjects: subjectConst,
            districts:districtConst,
            classTeaches: classTeachConst,
            subjectIds: [],
            tutorInfo: {
                college: '',
                major: '',
                graduationYear: '',
                level: '',
                gender: '',
                yearOfBirth: '',
                subject: [],
                classTeach: [],
                district: [],
                moreInfo: '',
                freeTime: [],
                salaryPerHour: ''
            },
            user: {},
            isMergeSubjects : false,
            isMergeDistricts : false,
            isMergeClassTeaches : false,
            subjectsBackup: [],
            classTeachesBackup: [],
            districtsBackup: []
        }
    }

    onChangeFreeTime = (id, name, value) => {
        this.setState(prevState => ({
            lstFreeTime: prevState.lstFreeTime.map(
            obj => (obj.id === id ? Object.assign(obj, { [name]: value }) : obj)
          )
        }));
    }
    
    onHandleClickSubject = (id, checked) => {
        this.setState(prevState => ({
            subjects: prevState.subjects.map(
                subject => (subject.id === Number(id) ? 
                Object.assign(subject, { status: checked }) : subject))
        }));
    }

    onHandleClickClassTeach = (id, checked) => {
        this.setState(prevState => ({
            classTeaches: prevState.classTeaches.map(
                classTeach => (classTeach.id === Number(id) ? 
                Object.assign(classTeach, { status: checked }) : classTeach))
        }));
    }

    onHandleClickDistrict = (id, checked) => {
        this.setState(prevState => ({
            districts: prevState.districts.map(
                district => (district.id === Number(id) ? 
                Object.assign(district, { status: checked }) : district))
        }));
    }

    onChangeInfoTutor = (name, value) => {
        this.setState((prevState) => ({
            tutorInfo: {
                ...prevState.tutorInfo,
                [name]: value,
            },
        }));
    }

    componentDidMount() {
        this.props.fetchTutorByIdUser();
        this.props.fetchUser();
        this.setState({
            user: this.props.auth.user,
            tutorInfo: _.cloneDeep(this.props.tutor),
            lstFreeTime: this.props.tutor?.freeTimes ? _.cloneDeep(this.props.tutor?.freeTimes) : _.cloneDeep(freeTimeConst)
        });
    }

    getTutorModel = () => {
        const tutorModel = this.state.tutorInfo;
        let subjectArr = [];
            this.state.subjects.forEach(obj => {
                if(obj.status === true) {
                    subjectArr.push(obj.id);
                }
            });
        tutorModel.subject = subjectArr;

        let districtArr = [];
        this.state.districts.forEach(obj => {
            if(obj.status === true) {
                districtArr.push(obj.id);
            }
        });
        tutorModel.district = districtArr;

        let classTeachArr = [];
        this.state.classTeaches.forEach(obj => {
            if(obj.status === true) {
                classTeachArr.push(obj.id);
            }});

        tutorModel.classTeach = classTeachArr;
        tutorModel.freeTime = this.state.lstFreeTime;
        return tutorModel;
    }

    componentDidUpdate(prevProps, prevState) {
        if (
          JSON.stringify(this.props.tutor) !==
          JSON.stringify(prevProps.tutor)
        ) {
          this.setState({ 
            tutorInfo: _.cloneDeep(this.props.tutor),
            lstFreeTime: _.cloneDeep(this.props.tutor.freeTimes)
           });
        }
    }

    changeInfoUser = (userInfo) => {
        this.props.onChangeInfoUser(userInfo);
    }

    mergeLst = (lstFirst, lstSecond, name, isMerged, backup) => {
        if(lstSecond && lstFirst && lstFirst.length > 0  && lstSecond.length > 0) {
            const lstSecondNew = lstSecond.map(obj => 
                 ({...obj, status: true}));
            let newLst =  lstFirst.filter(
                first => ! lstSecondNew.find (second => first.id === second.id));
            newLst =  newLst.concat(lstSecondNew).sort((a, b) => { 
                return a.id - b.id;
            });
            const lstBackup = _.cloneDeep(newLst) ;
            this.setState({
                [backup]: lstBackup,
                [name] : newLst,
                [isMerged] : true,
            })
        }
    }

    handleSubmitTutor = async() => {
        let tutorModel = this.getTutorModel();
        const {tutor} = this.props;
        //check tutor empty
        if(Object.keys(tutor).length === 0 && tutor.constructor === Object) {
            console.log("create tutor");
            await this.props.onCreateTutor(tutorModel);
            // await this.props.fetchTutorByIdUser();
        } else {
            console.log("edit tutor");
            await this.props.onEditInfoTutor(tutorModel, tutor.id);
            // await this.props.fetchTutorByIdUser();
        }
    }

    cancelUpdate = () => {
        this.setState({
            tutorInfo: this.props.tutor,
            lstFreeTime: this.props.tutor?.freeTimes ? _.cloneDeep(this.props.tutor?.freeTimes) : _.cloneDeep(freeTimeConst),
            subjects:  _.cloneDeep(this.state.subjectsBackup),
            districts: _.cloneDeep(this.state.districtsBackup),
            classTeaches: _.cloneDeep(this.state.classTeachesBackup)
        });
       
    }

    onHandleChangeImage = (formData) => {
        const {user} = this.props;
        if(user?.image) {
            callApi(`auth/change-image/${localStorage.getItem("id")}`, "POST", formData).then(res => {
                if (res.status === 200) {
                  notification.success({
                    message: "Success",
                    description: "Cập nhật ảnh thành công!"
                  });
                  this.props.fetchUser();
                  this.setState({
                    user: this.props.user
                });
                }
              }).catch(error => {
                console.log("Error: ", error);
            });
        } else {
            callApi(`auth/upload-image/${localStorage.getItem("id")}`, "POST", formData).then(res => {
                if (res.status === 200) {
                  notification.success({
                    message: "Success",
                    description: "Cập nhật ảnh thành công!"
                  });
                  this.props.fetchUser();
                  this.setState({
                    user: this.props.user
                });
                }
              }).catch(error => {
                console.log("Error: ", error);
            });
        }

    }

    render() {
        let { subjects, districts, classTeaches, lstFreeTime } = this.state;
        if (!this.state.isMergeSubjects) {
            this.mergeLst(subjects, this.props.tutor?.subjects, 'subjects', 'isMergeSubjects', 'subjectsBackup');
        };

        if (!this.state.isMergeDistricts) {
            this.mergeLst(districts, this.props.tutor?.districts, 'districts', 'isMergeDistricts', 'districtsBackup');
        };
        if (!this.state.isMergeClassTeaches) {
            this.mergeLst(classTeaches, this.props.tutor?.classTeaches,'classTeaches', 'isMergeClassTeaches', 'classTeachesBackup');
        };
        const {user} = this.props.auth;
        let tutorInfo = this.state.tutorInfo;

        return (
            <div>
                <Header/>
                <div className="bg-color">
                    <div className="p-5 mx-5">
                        <Grid container spacing={3}>
                            <ThongTinCaNhan
                                onHandleChangeImage={this.onHandleChangeImage}
                                history={this.props.history}
                                tutor={tutorInfo}
                                changeInfoUser={this.changeInfoUser} 
                                user={user}/>
                            <ThongTinHoSo
                                cancelUpdate={this.cancelUpdate}
                                tutor={tutorInfo}
                                onChangeInfoTutor={this.onChangeInfoTutor} 
                                handleSubmitTutor={this.handleSubmitTutor}
                                onHandleClickSubject={this.onHandleClickSubject}
                                onHandleClickClassTeach={this.onHandleClickClassTeach}
                                onHandleClickDistrict={this.onHandleClickDistrict}
                                lstFreeTime={lstFreeTime} 
                                onChangeFreeTime={this.onChangeFreeTime} 
                                subjects={subjects}
                                districts={districts}
                                classTeaches={classTeaches}/>
                        </Grid>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        tutor: state.tutorDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => {
            dispatch(actFetchUserRequest());
        },
        onChangeInfoUser: (userInfo) => {
            dispatch(actChangeInfoUserRequest(userInfo));
        },
        fetchTutorByIdUser: () => {
            dispatch(actFetchTutorByIdUserRequest());
        },
        onEditInfoTutor: (tutorInfo, idTutor) => {
            dispatch(actChangeInfoTutorRequest(tutorInfo, idTutor));
        },
        onCreateTutor: (tutorInfo) => {
            dispatch(actCreateTutorRequest(tutorInfo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HoSoGiaSu);