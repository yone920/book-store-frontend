import React, { Component } from 'react'
import {logoutUser} from '../redux/actions';
import {connect} from 'react-redux';
import CategoryList from '../components/CategoryList'
import ProductCard  from '../components/ProductCard'
import '../stylesheet/home.scss'


class Home extends Component {

    

    mapOverCategories = () => {   
        if  (this.props.categories.categories) { 
        return this.props.categories.categories.map((category) => {
            return <CategoryList key={category.id} history={this.props.history} category={category} />
        })
    }
    }

    mapOverProducts = () => {
        if (this.props.current_site_user.products) {
            return this.props.current_site_user.products.map((product) => {
                if (product.featured ) {
                    return <ProductCard key={product.id} history={this.props.history} product={product} />
                }
            }) 
        }
    }
   
    // componentDidMount = () => {

    // }
    
    render() {                
        return (
            <div className="home-div">
               
                <div className="home-wrapper">
                    <div className="home-categories">
                    <h3>Categories</h3>
                        {this.mapOverCategories()}
                    </div>
                    <div className="featured-products">
                        <div className="site-name">
                            <h1>Your Favourite Books Store</h1>
                            <div className="featured-header">
                                <h3>Feature Products</h3>
                            </div>
                        </div>
                        <div className="home-products">
                            <main className="main-area">
                                <div className="centered">
                                    <section className="cards">
                                        {this.mapOverProducts()}
                                    </section>
                                </div>
                            </main>
                        </div>
                    </div>
            </div>
            </div>
        )
    }
}

    const mapStateToProps = state => ({
        current_site_user: state,
        categories: state.categories
    })

    const mapDispatchToProps = dispatch => ({
        logoutUser: () => dispatch(logoutUser())

    })


export default connect(mapStateToProps, mapDispatchToProps)(Home)