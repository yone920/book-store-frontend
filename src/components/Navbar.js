import React, { Component } from 'react'
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {

    // Controls login button
    loginButton = () => {
        return localStorage.token ? null : <li><Link href=" " onClick={this.handleClick}>Login</Link></li>;
    }
    handleClick = event => {
        this.props.history.push('/login')
    }

    // Controls signup button
    signUpButton = () => {
        return localStorage.token ? null : <li><Link href=" "  onClick={this.handleSignUpClick}>Signup</Link></li> ;
    }
    handleSignUpClick = event => {
        this.props.history.push('/signup')
    }

    // Controls logout button
    signOutButton = () => {
        return localStorage.token ?      <li className="signout"><Link href=" " onClick={this.handleSignOutClick}>SignOut</Link></li>
     : null ;
    }
    handleSignOutClick = event => {
        localStorage.clear()
        this.props.logoutUser()
        this.props.history.push('/')
        // this.props.clearCurrentUser()
    }

    handleCartClick = event => {
        this.props.history.push('/cart')
    }

    handleHomeClick = event => {
        this.props.history.push('/')
    }
    

    mapOverCategories = () => {   
        if  (this.props.categories.categories) { 
        return this.props.categories.categories.map((category) => {
            return <CategoryList key={category.id} history={this.props.history} category={category} />
        })
    }
    }



    current_order() {
        if (this.props.current_site_user.current_order) {
            if( this.props.current_site_user.orders) {
                return this.props.current_site_user.orders.find(order => { 
                    return this.props.current_site_user.current_order === order.id
                })
            }
        }
    }


    total_qty = () => {
        if (this.current_order()) {            
            return this.current_order().total_qty
        }
    }




    render() {
        
        return (
            <div className="navbar2">
                <div className="top-nav-ul">
                    <ul>
                        {/* <li><Link onClick={this.handleHomeClick}>Home</Link></li> */}
                        <li><Link to="/">Home</Link></li>
                        {this.loginButton()}
                        {this.signUpButton()}
                        {this.props.current_site_user.name ? <li><Link  className="username" href=" ">Welcome {this.props.current_site_user.name}</Link></li> : null }
                        <li className="cart-icon"><Link to="/cart" className=""> <FontAwesomeIcon icon="shopping-cart"/> {this.total_qty()}</Link></li>
                        {/* <li className="cart-icon"><Link className=""  onClick={this.handleCartClick}> <FontAwesomeIcon icon="shopping-cart"/> {this.total_qty()}</Link></li> */}


                        {this.signOutButton()}
                    </ul>
                </div>
                <div className="home-categories-navbar">
                    {this.mapOverCategories()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    current_site_user: state.current_site_user,
    categories: state.categories
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))