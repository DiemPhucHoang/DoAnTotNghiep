import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchUsersRequest, actSearchUserRequest } from '../../actions/user';
import UserItem from '../../components/admin/UserItem';
import UserList from '../../components/admin/UserList';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import Pagination from '@material-ui/lab/Pagination';
import SearchUser from '../../components/admin/SearchUser';

class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
        }
    }

    onChange = (event, page) => {
        this.setState({
            activePage: page,
        });
        let number = page - 1;
        
        this.props.fetchAllUsers(number);

        if (this.props.search.isSearch) {
            this.props.onSearch(this.props.search, number);
        } else {
            this.props.fetchAllUsers(number);
        }
    }

    componentDidMount() {
        let number = this.state.activePage - 1;
        this.props.fetchAllUsers(number);
        
    }

    onSearchUsers = (search) => {
        this.setState({
            activePage: 1,
        }, () => {
            let number = 0;
            let { name, phone } = this.props.search;
            if (!(name === undefined &&
                phone === undefined)
                || (name === "" &&
                    phone === "")
            ) {
                let searchInfo = {
                    name: search.name,
                    phone: search.phone,
                };
                this.props.onSearch(searchInfo, number);
            }
            
        });
    }

    render() {
        const { users } = this.props;
        const { content } = users;
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item active">Quản lý user</li>
                            </ol>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            <i className="fas fa-table" />
                                            <span>Danh sách tất cả user</span>
                                        </div>
                                        <div className="col-2">
                                            <Link to="/admin/them-user"><button type="button" className="btn btn-dark btn-sm">+ Thêm user</button></Link>
                                        </div>
                                    </div>

                                </div>
                                <SearchUser
                                    onSearchUsers={this.onSearchUsers}
                                />
                                <UserList>
                                    {this.showUser(content)}
                                </UserList>
                                {/* phân trang */}
                                <div >
                                    <Pagination style={{ float: "right" }}
                                        count={users.totalPages}
                                        page={users.number + 1}
                                        onChange={this.onChange}
                                        color="primary" />
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    showUser(users) {
        var result = null;
        console.log(users)
        const hasUsers = users && users.length > 0;
        if (hasUsers) {
            result = users.map((useritem, index) => {
                return (
                    <UserItem
                        key={index}
                        useritem={useritem}
                        index={index}
                    />
                );
            });
        }
        return result;
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        search: state.searchUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsers: (page) => {
            dispatch(actFetchUsersRequest(page));
        },
        onSearch: (searchInfo, pageSearch) => {
            dispatch(actSearchUserRequest(searchInfo, pageSearch));
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);