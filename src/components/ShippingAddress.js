import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../stylesheet/shippingAddress.scss'
import { addShippingAddressToCurrentOrder } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ShippingAddress extends Component {

    state = {
        fname: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.props.user.current_order) {
            this.props.addShippingAddressToCurrentOrder({...this.state, current_order: this.props.user.current_order})
        }

        this.props.history.push('/checkout')
    }

    render() {        
        return (
                <div className="shipping-address">
                    <div className="row">
                        <div className="col-50">
                            <h3>Shipping Address</h3>
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
                                <input type="text" id="fname" name="fname" value={this.state.fname} onChange={this.handleChange} placeholder="John M. Doe"></input>
                                <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                <input type="text" id="adr" name="address" value={this.state.address} onChange={this.handleChange} placeholder="542 W. 15th Street"></input>
                                <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
                                <input type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange} placeholder="New York"></input>

                                <div className="row">
                                    <div className="col-50">
                                        <label htmlFor="state">State</label>
                                        <input type="text" id="state" name="state" value={this.state.state} onChange={this.handleChange} placeholder="NY"></input>
                                    </div>
                                    <div className="col-50">
                                        <label htmlFor="zip">Zip</label>
                                        <input type="text" id="zip" name="zip" value={this.state.zip} onChange={this.handleChange} placeholder="10001"></input>
                                    </div>
                                </div>
                               
                                <div className="next-container">
                                    <div className="next-button">
                                        <input type="submit" value="Next" /><FontAwesomeIcon icon="arrow-right"></FontAwesomeIcon>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    addShippingAddressToCurrentOrder: (shipping_address) => dispatch(addShippingAddressToCurrentOrder(shipping_address))
})

const mapStateToProps = state => ({
    user: state.current_site_user
})

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress)