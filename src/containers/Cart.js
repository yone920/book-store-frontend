import React, { Component } from 'react'
import {connect} from 'react-redux';
import CartItem from '../components/CartItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

import '../stylesheet/cart.scss'


class Cart extends Component {

    current_order() {
        if (this.props.user.orders) {
            return this.props.user.orders.find(order => { 
                return this.props.user.current_order === order.id
            })
        }
    }

    totalPrice() {
        if (this.current_order()) {
           return <h3>Total Price: ${this.current_order().total_price}</h3>
        }
    }

    mapOverCartItems = () => {   
        if (this.current_order()) {     
        return this.current_order().order_items.map((item) => {
            return <CartItem key={item.id} history={this.props.history} item={item} />
        })
    }
    }

    handleClick = () => {
        this.props.history.push('/shpping-address')
    }
    
    render() {  
        // const order = this.current_order()
        // debugger
        // const order_items = order.order_items
        return (
            <div className="cart-container">
                <div className="cart-section">
                    <h3>My Cart</h3>
                        {this.mapOverCartItems()}
                    <div className="cart-summary-div">
                        <div className="total-price">
                            {this.totalPrice()}
                        </div>
                        <div className="cart-next-div"><Link onClick={this.handleClick} className="checkout-button">
                             <span>Next</span><FontAwesomeIcon  icon="arrow-right"></FontAwesomeIcon>
                            </Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.current_site_user
})


export default connect(mapStateToProps)(Cart)