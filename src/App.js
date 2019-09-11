import React, { Component, Fragment } from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import ProductPage from './containers/ProductPage'
import CategoryPage from './containers/CategoryPage'
import CartList from './containers/Cart'
import CheckOut from './containers/CheckOut'
import ReportPage from './containers/ReportPage'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './containers/Profile';
import BookFooter from './components/BookFooter'
import OhhPageNotFount from './components/OhhPageNotFount'
import { connect } from 'react-redux'
import {getProfileFetch, fetchCategories, fetchProducts, fetchCart} from './redux/actions';
import Navbar from './components/Navbar';
import ShippingAddress from './components/ShippingAddress';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faShoppingCart, faBook, faTimes, faArrowRight, faSignInAlt, faUserPlus, faCheck, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope, faKey, faShoppingCart, faBook, faTimes, faArrowRight, faSignInAlt, faUserPlus, faCheck, faAngleDoubleRight, faAngleDoubleLeft);

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchProducts()
    if (localStorage.token) {
      this.props.getProfileFetch()
      this.props.fetchCart(this.props.current_user)
    }
}

  render() {        
    return (
        <Fragment>

          <Navbar />
        
        <Switch>
  
          {/* <Route path='/login' component={Login}/> */}

          <Route 
            exact path = '/login'
            render={(routerProps) => {
              return (
                <Login 
                  {...routerProps}
                  
                />
              )
            }}
          />

          <Route 
            exact path = '/profile'
            render={(routerProps) => {
              return (
                <Profile 
                  {...routerProps}
                  hello="chesse"
                />
              )
            }}
          />

          < Route exact path = '/signup'
          component = {
            SignUp
          }
          />

          <Route 
            exact path='/categories/:id' 
            render={(routerProps) => {
              return (
                <CategoryPage 
                  {...routerProps}
                  
                />
              )
            }}
          />



          <Route 
            exact path = '/products/:id'
            render={(routerProps) => {
              return (
                <ProductPage 
                  {...routerProps}
                  
                />
              )
            }}
          />


          <Route 
            exact path='/cart' 
            render={(routerProps) => {
              return (
                <CartList
                  {...routerProps}
                  
                />
              )
            }}
          />

          < Route exact path = '/shpping-address' 
            component = {
              ShippingAddress
            }
          />

          < Route exact path = '/checkout'
          component = {
            CheckOut
          }
          />
          < Route exact path = '/report'
          component = {
            ReportPage
          }
          />

          <Route exact
            path='/' 
            render={(routerProps) => {
              return (
                <Home 
                  {...routerProps}
                  
                  clearCurrentUser={this.clearCurrentUser}
                />
              )
            }}
          />

        
          <Route component={OhhPageNotFount} />
        </Switch>
        <BookFooter />
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  current_user: state.current_site_user
})

const mapDispatchToProps = {
getProfileFetch: getProfileFetch,
fetchCategories: fetchCategories,
fetchProducts: fetchProducts,
fetchCart: fetchCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 