import React, { Component } from 'react';
import DanhSachGiaSu from '../components/danhGiaGiaSu/DanhSachGiaSu';
import FormDanhGiaGiaSu from '../components/danhGiaGiaSu/FormDanhGiaGiaSu';
import callApi from '../utils/apiCaller';

class DanhGiaGiaSu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutors: [],
            phone: ""
        }
    }
    
    showTutorRating = phone => {
        callApi(`tutor/parent/${phone}`, "GET", null).then(res => {
            if (res.status === 200) {
                console.log("res.data.result: ", res.data.result);
              this.setState({
                tutors: res.data.result,
                phone: phone
            });
            }
          }).catch(error => {
            console.log("Error: ", error);
        });
    }
    render() {
        return (
            <div className="bg-color">
                <div className="px-5 pt-5 pb-3 mx-5">
                    <FormDanhGiaGiaSu showTutorRating={this.showTutorRating}/>
                    {this.state.tutors.length > 0 ? <DanhSachGiaSu phone={this.state.phone} tutors={this.state.tutors}/> : " "}
                    
                </div>
            </div>
        );
    }
}

export default DanhGiaGiaSu;