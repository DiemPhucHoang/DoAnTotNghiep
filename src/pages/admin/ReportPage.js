import React, { Component } from 'react';
import ServiceFeeChart from '../../components/admin/ServiceFeeChart';
import InvoiceList from '../../components/admin/InvoiceList';
import InvoiceItem from '../../components/admin/InvoiceItem';
import { connect } from 'react-redux';
import { actFetchInvoiceRequest } from '../../actions/invoice';
import { Link } from 'react-router-dom';
import Nav from '../../components/admin/Nav';
import Menu from '../../components/admin/Menu';
import Pagination from '@material-ui/lab/Pagination';

class ReportPage extends Component {
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
        this.props.fetchAllInvoice(number);
    }
    
    componentDidMount() {
        let number = this.state.activePage - 1;
        this.props.fetchAllInvoice(number);
    }
    render() {
        const { invoices } = this.props;
        const { content } = invoices;
        return (
            <div>
                <Nav />
                <div id="wrapper">
                    <Menu />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Thống kê nhận lớp</li>
                            </ol>
                            <ServiceFeeChart />
                            <div className="card mt-60" >
                                <div className="card-header">
                                    <i className="fas fa-table" />
                                    <span>Thống kê nhận lớp</span>
                                </div>
                                <InvoiceList>
                                    {this.showInvoices(content)}
                                </InvoiceList>

                                <div >
                                    <Pagination style={{ float: "right" }}
                                        count={invoices.totalPages}
                                        page={invoices.number + 1}
                                        onChange={this.onChange}
                                        color="primary" />
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    showInvoices(invoices) {
        var result = null;
        const hasInvoices = invoices && invoices.length > 0;
        if (hasInvoices) {
            result = invoices.map((invoice, index) => {
                return (
                    <InvoiceItem
                        key={index}
                        invoice={invoice}
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
        invoices: state.invoices
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllInvoice: (page) => {
            dispatch(actFetchInvoiceRequest(page));
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);