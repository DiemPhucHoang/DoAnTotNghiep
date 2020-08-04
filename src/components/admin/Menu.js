import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'Trang chủ',
        icon: 'fas fa-fw fa-tachometer-alt',
        to: '/admin',
        exact: true
    },
    {
        name: 'Quản lý lớp',
        icon: 'fas fa-fw fa-table',
        to: '/admin/quan-ly-lop',
        exact: false
    },
    {
        name: 'Quản lý user',
        icon: 'fas fa-user-circle fa-fw',
        to: '/admin/quan-ly-user',
        exact: false
    },
    {
        name: 'Duyệt GS đăng ký lớp',
        icon: 'fas fa-fw fa-chart-area',
        to: '/admin/duyet-gia-su-dk-lop',
        exact: false
    },
    {
        name: 'Duyệt P.Huynh chọn GS',
        icon: 'fas fa-fw fa-folder',
        to: '/admin/duyet-phuynh-chon-giasu',
        exact: false
    },
    {
        name: 'Thống kê nhận lớp',
        icon: 'fas fa-fw fa-chart-area',
        to: '/admin/thong-ke-nhan-lop',
        exact: false
    }
];

const MenuLink = ({ lable, icon, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className="nav-item">
                        <Link className={"nav-link " + active} to={to}>
                            <i className={icon} />
                            <span>{lable}</span>
                        </Link>
                    </li>
                );
            }}
        />
    );
};

class Menu extends Component {
    render() {
        return (
            <ul className="sidebar navbar-nav">
                {this.showMenus(menus)}
            </ul>
        );
    }

    showMenus = (menus) => {
        var result = null;
        if(menus.length > 0){
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        lable={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                        icon={menu.icon}
                    />
                )
            })
        }
        return result;
    }
}

export default Menu;