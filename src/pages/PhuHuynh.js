import React, { Component } from "react";
import { Paper, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import TimGiaSuNhanh from "./../components/phuhuynh/TimGiaSuNhanh";
import DanhSachGiaSu from "./../components/phuhuynh/DanhSachGiaSu";
import DangYeuCauTimGiaSu from "./../components/phuhuynh/DangYeuCauTimGiaSu";
import GiaSuItem from "./../components/phuhuynh/GiaSuItem";
import { actFetchTutorsRequest, actDeleteSearchInputTutor } from "./../actions/tutor";
import { connect } from "react-redux";
import { actSearchTutorsRequest } from "./../actions/tutor";
import "./PhuHuynh.css";
import { subjectConst, districtConst, classTeachConst } from '../constants/tutor';
import Footer from '../components/Footer';
import Header from '../components/Header';


class PhuHuynh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitRequest: false,
            activePage: 1,
            subjects: subjectConst,
            districts: districtConst,
            classTeaches: classTeachConst,

        }
    }

    componentDidMount() {
        this.props.deleteSearchInputTutor();
        this.props.fetchAllTutors(0);
    }

    showSubmitRequest = () => {
        this.setState({
            submitRequest: true,
        });
    };
    onCloseSubmitRequest = () => {
        this.setState({
            submitRequest: !this.state.submitRequest
        });
    }

    onSearchTutors = (search) => {
        this.setState({
            activePage: 1,
        }, () => {
            let number = 0;
            let { subject, district, classTeach, level, gender } = this.props.search;
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
            }
        });
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        if (this.props.search.isSearch) {
            this.props.onSearch(this.props.search, number);
        } else {
            this.props.fetchAllTutors(number);
        }
    }

    showTutors = content => {
        let result = null;
        const hasContent = content && content.length > 0;
        if (hasContent) {
            result = content.map((tutorItem, index) => {
                return <GiaSuItem key={index} tutorItem={tutorItem} chooseTutor={this.chooseTutor} />
            });
        }
        return result;
    }

    chooseTutor = id => {
        this.props.history.push({
            pathname: '/chon-gia-su',
            state: { tutorId: id }
        })

    }

    render() {
        const { tutor } = this.props;
        const content = tutor.content;
        let { subjects, districts, classTeaches } = this.state;
        let { history } = this.props;
        return (
            <div>
                <Header />
                <div className="bg-color">
                    <div className="p-5 mx-5">
                        <TimGiaSuNhanh
                            onSearchTutors={this.onSearchTutors}
                            subjects={subjects}
                            districts={districts}
                            classTeaches={classTeaches}
                        />
                        <br />
                        <Paper style={{ padding: "20px" }}>
                            <p>
                                <b>DANH SÁCH GIA SƯ</b>
                                <Button
                                    onClick={this.showSubmitRequest}
                                    variant="contained"
                                    color="primary"
                                    style={{ float: "right" }}
                                >
                                    + Đăng yêu cầu
                            </Button>
                                <DangYeuCauTimGiaSu
                                    submitRequest={this.state.submitRequest}
                                    onCloseSubmitRequest={this.onCloseSubmitRequest}
                                    subjects={subjects}
                                    districts={districts}
                                    classTeaches={classTeaches}
                                    history={history}
                                />
                            </p>{" "}
                            <br />
                            <DanhSachGiaSu>{this.showTutors(content)}</DanhSachGiaSu>
                            <br />
                            {/* Phan trang */}
                            <div style={{ float: "right" }}>
                                <Pagination
                                    count={tutor.totalPages}
                                    page={tutor.number + 1}
                                    onChange={this.onChange}
                                    color="primary" />
                            </div>
                            <br />
                            <br />
                        </Paper>
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
        search: state.searchTutor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTutors: (page) => {
            dispatch(actFetchTutorsRequest(page));
        },
        onSearch: (searchInfo, pageSearch) => {
            dispatch(actSearchTutorsRequest(searchInfo, pageSearch));
        },
        deleteSearchInputTutor: () => {
            dispatch(actDeleteSearchInputTutor());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhuHuynh);
