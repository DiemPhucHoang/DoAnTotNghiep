import React, { Component } from 'react';
import moment from 'moment';

class InvoiceItem extends Component {
    constructor(props) {
        super(props);
        this.state= {
            name: ''
        }
    }

    render() {
        var { invoice } = this.props;
        return (
            <tr>
                <td>{invoice.idInvoice}</td>
                <td>{invoice.idClass}</td>
                <td>{invoice.classTeach}</td>
                <td>{invoice.tutorName}</td>
                <td>{invoice.serviceFee}</td>
                <td>{moment(invoice.time).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}

export default InvoiceItem;