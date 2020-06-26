import React, { Component } from 'react';
import { Paper} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import DanhSachLopMoi from './../components/lopMoi/DanhSachLopMoi';
import TimLopMoi from './../components/lopMoi/TimLopMoi';
import LopMoiItem from './../components/lopMoi/LopMoiItem';
import { connect } from 'react-redux';
import {actFetchClassesRequest} from './../actions/classes';
import {actSearchClassesRequest} from './../actions/classes';
import callApi from "./../utils/apiCaller";

class LopMoi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitRequest: false,
            activePage: 1,
            subjects: [],
            districts: [],
            classTeaches: [],

        }
    }

    componentDidMount() {
        let number = this.state.activePage - 1;
        let {subject, district, classTeach, level, gender} = this.props.search;
        if ((subject === undefined && 
            district === undefined && 
            classTeach === undefined && 
            level === undefined &&
            gender === undefined) 
            || (subject === "" && 
                 district === "" &&
                classTeach === "" &&
                level === "" &&
                gender === "")
        ) {
            this.props.fetchAllClasses(number);
          }
        this.getAll();
    }

    showClasses = (classes) => {
        let result = null;
        const hasClasses = classes && classes.length > 0;
        if (hasClasses) {
            result = classes.map((classItem, index) => {
                return <LopMoiItem key={index} classItem={classItem}/>
            });
        }
        return result;
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        this.props.fetchAllClasses(number);
        if(this.props.search.isSearch) {
            this.props.onSearch(this.props.search, number);
          }else {
            this.props.fetchAllClasses(number);
        }
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

    onSearchClasses = (search) => {
        this.setState({
            activePage: 1,
          }, () => {    
            let number = 0;
            let {subject, district, classTeach, level, gender} = this.props.search;
            if (!(subject === undefined && 
                district === undefined && 
                classTeach === undefined && 
                level === undefined &&
                gender === undefined) 
                || (subject === "" && 
                    district === "" &&
                    classTeach === "" &&
                    level === "" &&
                    gender === "")
            ) {
            let searchInfo = {
              subject: search.subject,
              classTeach: search.classTeach,
              district: search.district,
              level: search.level,
              gender: search.gender
            };
            this.props.onSearch(searchInfo, number);
          }});
    }


    render() {
        const {classes} = this.props;
        const {content} = classes;
        let {subjects, districts, classTeaches} = this.state;
        return (
            <div className="bg-color">
                <div className="p-5 mx-5">
                    <TimLopMoi 
                        onSearchClasses={this.onSearchClasses}
                        subjects={subjects} 
                        districts={districts} 
                        classTeaches={classTeaches}/>
                    <br />
                    <Paper style={{ padding: "20px" }}>
                        <p>
                            <b>LỚP MỚI CHƯA GIAO</b>
                            <img src="image/hot.gif" alt="hot" style={{ marginLeft: "10px" }}/>
                        </p>
                        <br />
                        <DanhSachLopMoi>{this.showClasses(content)}</DanhSachLopMoi>
                        <br />
                        {/* Phan trang */}
                        <div style={{ float: "right" }}>
                            <Pagination 
                                count={classes.totalPages}
                                page={classes.number + 1}
                                onChange={this.onChange}
                                color="primary" />
                        </div>
                        <br />
                        <br />
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        classes: state.classes,
        search: state.searchClass
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClasses: (page) => {
            dispatch(actFetchClassesRequest(page));
        },
        onSearch: (searchInfo, pageSearch) => {
            dispatch(actSearchClassesRequest(searchInfo, pageSearch));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LopMoi);