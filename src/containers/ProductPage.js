import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';
import { grabSingleProduct } from '../redux/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheet/product_page.scss'



class ProductPage extends Component {

    state = {
        quantity: 1,
        add_to_cart: false
    }

    componentDidMount() {
        this.props.grabSingleProduct(this.props.location.pathname)
    }

    handleChange = event => {
        this.setState({quantity: event.target.value})
    }

    handleSubmit = event => {        
        event.preventDefault()
        localStorage.token ?  this.props.addToCart({...this.state, user: this.props.user, product: this.props.product}) : this.props.history.push('/login');
        // this.state.add_to_cart = true
        this.setState({add_to_cart: true})

    }

    returnImage = () => {
        return `../img/${parseInt(this.props.product.main_image)}.jpg`
    }

    handleClick = () => {
        this.props.history.push('/')
    }

    handleRightClick = () => {
        this.props.history.push('/cart')
    }

    addToCartConfirmation = () => {
        return this.state.add_to_cart ? 
        <div className="link-to-cart">
        <div className="cart-confirmation-div">
            <div className="added-to-cart">
                <div className="tick"><FontAwesomeIcon icon="check"/></div>
                <div className="prod-image"><img src={this.returnImage()} alt="A banana that looks like a bird"></img></div>
                <div className="text-added"><p>Added to Cart</p></div>
            </div>
            <div className="cart-subtotal">
                <p>Cart subtotal ( {this.state.quantity} item ): ${this.state.quantity * this.props.product.price_in_cents}</p>
            </div>
            <div className="proceed-to-cart">
                
                <div onClick={this.handleClick} className="left">
                    <FontAwesomeIcon icon="angle-double-left"/>
                    <p>Continue Shopping</p>
                </div>
                <div onClick={this.handleRightClick} className="right">
                    <FontAwesomeIcon icon="angle-double-right"/>
                    <p>Proceed to Cart</p>
                </div>
            </div>
        </div>
    </div>
        :
    null;    
}

    render() {                    
        return (
            <div className="product-page-wrapper">
                <div className="product-page-container">
                    <div className="main">
                        <div className="product-image-detail">
                            <div className="product-page-image">
                                <img src={this.returnImage()} alt="A banana that looks like a bird"></img>
                            </div>
                            <div className="product-page-details">
                                <h3>{this.props.product.name}</h3>
                                <h5>${this.props.product.price_in_cents}</h5>
                                {/* <button onClick={this.handleClick}>Add To Cart</button> */}
                                <div className="add-to-cart-button">
                                    <form onSubmit={this.handleSubmit}>
                                        <button type="submit">Add To Cart</button>
                                        <label htmlFor="quantity">Qty:</label>
                                        <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange}></input>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="product-page-desc">
                            <h3>Description</h3>
                            <p>{this.props.product.description}</p>
                        </div>
                    </div>
                   {this.addToCartConfirmation()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    product: state.product,
    user: state.current_site_user
})

const mapDispatchToProps = dispatch => ({
    addToCart: (singleProduct) => dispatch(addToCart(singleProduct)),
    grabSingleProduct:(product_id) => dispatch(grabSingleProduct(product_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)