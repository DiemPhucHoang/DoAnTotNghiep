import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusParent: 'old',
            errPhoneOld: '',
            errPhoneNew: ''
        }
    }

    render() {
        if (this.props.currentStep !== 2) {
            return null
        }
        return (
            <div className="form-group ">
                <h3>Thêm thông tin phụ huynh</h3>
                <div className="form-check-inline">
                    <div className="form-check ">
                        <label className="form-check-label">
                            <input type="radio"
                                className="form-check-input"
                                name="statusParent"
                                value="old"
                                onChange={this.props.handleChange}
                                defaultChecked
                            />Phụ huynh cũ
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input type="radio"
                                className="form-check-input"
                                name="statusParent"
                                value="new"
                                onChange={this.props.handleChange}
                            />Phụ huynh mới
                        </label>
                    </div>
                </div>
                {this.displayForm()}
                <div className="row">
                    <div className="col-6">
                        <Link to="/class-list" className="btn btn-secondary btn-block">
                            HỦY
                        </Link>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-success btn-block">LƯU LẠI</button>
                    </div>
                </div>

            </div>
        );
    }

    validatePhoneOld = () =>{
        let isErr = false;
        let errors = {};
        const regexPhone = /^\d{10,11}$/;
        if (regexPhone.exec(this.props.phoneParent) !== null) {
            isErr = false;
            errors.errPhoneOld = ''
        }
        else {
            isErr = false;
            errors.errPhoneOld = 'Số điện thoại phải 10 - 11 ký tự'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isErr;
    }

    validatePhoneNew = () =>{
        let isErr = false;
        let errors = {};
        const regexPhone = /^\d{10,11}$/;
        if (regexPhone.exec(this.props.phoneParent) !== null) {
            isErr = false;
            errors.errPhoneNew = ''
        }
        else {
            isErr = false;
            errors.errPhoneNew = 'Số điện thoại phải 10 - 11 ký tự'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isErr;
    }


    renderPHcu() {
        return (
            <div className="form-group">
                <label>Số điện thoại phụ huynh</label>
                <input
                    type="number"
                    className="form-control"
                    name="phoneParent"
                    value={this.props.phoneParent}
                    onChange={this.props.handleChange}
                    onBlur={this.validatePhoneOld}
                />
                {(this.state.errPhoneOld.length > 0) ? <p className="form-warning">{this.state.errPhoneOld}</p> : ''}
            </div>
        );
    }

    renderPHmoi() {
        return (
            <div>
                <div className="form-group">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nameParent"
                        value={this.props.nameParent}
                        onChange={this.props.handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phoneParent"
                        value={this.props.phoneParent}
                        onChange={this.props.handleChange}
                        onBlur={this.validatePhoneNew}
                    />
                    {(this.state.errPhoneNew.length > 0) ? <p className="form-warning">{this.state.errPhoneNew}</p> : ''}
                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        className="form-control"
                        name="addressParent"
                        value={this.props.addressParent}
                        onChange={this.props.handleChange} required
                    />
                </div>
                <div className="form-group">
                    <label>Email (nếu có)</label>
                    <input
                        type="email"
                        className="form-control"
                        name="emailParent"
                        value={this.props.emailParent}
                        onChange={this.props.handleChange}
                    />
                </div>
            </div>
        );
    }

    displayForm() {
        if (this.props.statusParent === 'old') {
            return this.renderPHcu();
        }
        if (this.props.statusParent === 'new') {
            return this.renderPHmoi();
        }
        return null;
    }
}

export default Step2;