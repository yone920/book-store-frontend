import React, { Component } from 'react'
import '../stylesheet/report-page.scss'
import { connect } from 'react-redux';
import { changeUserCurrentOrderAttToNull } from '../redux/actions';



class ReportPage extends Component {

    current_order() {
        if (this.props.user.orders) {
            return this.props.user.orders.find(order => { 
                return this.props.user.current_order === order.id
            })
        }
    }

    order_products = () => {
        if (this.props.user.orders) {
            return this.current_order().order_items.map((item) => {
                return (<p key={item.id}>{item.product.name}</p>)
            })
        }
    }

    shipping_address = () => {
        if (this.props.user.orders) {
                return (
                    <div>
                        <p>{this.current_order().sh_fname}</p>
                        <p>{this.current_order().sh_address}</p>
                        <p>{this.current_order().sh_city}</p>
                        <p>{this.current_order().sh_state}</p>
                        <p>{this.current_order().sh_zip}</p>
                    </div>
                )
        }
    }

    totalPrice() {
        if (this.props.user.orders) {
           return <p>Order Price: {this.current_order().total_price}</p>
        }
    }

    shippingRate() {
        if (this.props.user.orders) {
           return <p>Shipping: {this.current_order().sh_rate}</p>
        }
    }

    shippingPlusOrderPrice() {
        if (this.props.user.orders) {
            return <h2>Total: {this.current_order().total_price + this.current_order().sh_rate}</h2>
         }
    }

    handleClick = event => {
        this.props.history.push('/')
    }

    componentWillUnmount()  {
        this.props.changeUserCurrentOrderAttToNull(this.props.user.id)
    }

    render() {        
        return (
            <div className="report-container">
                <div className="report-title">
                <h3>Order Confirmation</h3>
                </div>
                <div className="report-wrapper">
            
                    <div className="report-total">
                        <div className="ordered-books">
                            <h5>Books Ordered</h5>
                            {this.order_products()}

                        </div>
                        <div className="report-total-paid">
                            <h5>Total Paid</h5>
                            {this.totalPrice()}
                            {this.shippingRate()}
                            {this.shippingPlusOrderPrice()}
                        </div>
                    </div>
                    <div className="report-shipping">
                        <h5>Shipping Address</h5>
                        {this.shipping_address()}

                    </div>
                </div>
                <div className="report-back-to-home">
                    <button onClick={this.handleClick}>Home Page</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    user: state.current_site_user
})

const mapDispatchToProps = dispatch => ({
    changeUserCurrentOrderAttToNull: (user_id) => dispatch(changeUserCurrentOrderAttToNull(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage)