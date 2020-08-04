import React, { Component } from 'react';
import ClassList from '../../components/admin/ClassList';
import ClassItem from '../../components/admin/ClassItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchAllClassesRequest, actDeleteClassRequest, actSearchAllClassesRequest } from '../../actions/classes';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import Pagination from '@material-ui/lab/Pagination';
import callApi from "../../utils/apiCaller";
import SearchClass from '../../components/admin/SearchClass';
import { Card } from '@material-ui/core';

class ClassListPage extends Component {
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
        let { subject, district, classTeach, level, gender } = this.props.search;
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
    onDelete = (id) => {
        var { history } = this.props;
        this.props.onDeleteClass(id, history);
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        this.props.fetchAllClasses(number);
        if (this.props.search.isSearch) {
            this.props.onSearch(this.props.search, number);
        } else {
            this.props.fetchAllClasses(number);
        }
    }

    onSearchClasses = (search) => {
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

    render() {
        const { classes } = this.props;
        const { content } = classes;
        let { subjects, districts, classTeaches } = this.state;
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item active">Quản lý lớp</li>
                            </ol>

                            <Card className="mb-3" variant="elevation" elevation={3}>
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <i className="fas fa-table" />
                                            <span>Danh sách tất cả lớp</span>
                                        </div>
                                        <div className="col-2">
                                            <Link to="/admin/quan-ly-lop/them-lop"><button type="button" className="btn btn-dark btn-sm">+ Thêm lớp</button></Link>
                                        </div>
                                    </div>
                                </div>
                                <SearchClass
                                    onSearchClasses={this.onSearchClasses}
                                    subjects={subjects}
                                    districts={districts}
                                    classTeaches={classTeaches} />
                                <ClassList>
                                    {this.showClasses(content)}
                                </ClassList>
                                {/* phân trang */}
                                <div >
                                    <Pagination style={{ float: "right" }}
                                        count={classes.totalPages}
                                        page={classes.number + 1}
                                        onChange={this.onChange}
                                        color="primary" />
                                </div>
                                <br /><br />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
    showClasses(classes) {
        var result = null;
        const hasClasses = classes && classes.length > 0;
        if (hasClasses) {
            result = classes.map((classItem, index) => {
                return (
                    <ClassItem
                        key={index}
                        classItem={classItem}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        }
        return result;
    }
}

const mapStateToProps = state => {
    return {
        classes: state.classes,
        search: state.searchClass
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllClasses: (page) => {
            dispatch(actFetchAllClassesRequest(page));
        },
        onDeleteClass: (id, history) => {
            dispatch(actDeleteClassRequest(id, history));
        },
        onSearch: (searchInfo, pageSearch) => {
            dispatch(actSearchAllClassesRequest(searchInfo, pageSearch));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassListPage);