import React, { Component } from 'react';
import moment from 'moment';

class InvoiceItem extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name: ''
        }
    }
    
    // componentDidMount(){
    //     var { classRegisteritem } = this.props;
    //     var idTutor = classRegisteritem.tutors.idTutor;
    //     callApi(`tutors/getTutor/getUser?idTutor=${idTutor}`, "GET", null).then(res => {
    //         this.setState({name: res.data.result.name })
    //     })  
    // }
    render() {
        var { invoice } = this.props;
        return (
            <tr>
                <td>{invoice.idInvoice}</td>
                <td>{invoice.classTeach}</td>
                <td>{invoice.tutorName}</td>
                <td>{invoice.serviceFee}</td>
                <td>{moment(invoice.time).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}

export default InvoiceItem;