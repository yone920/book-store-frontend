import React, { Component } from 'react'
import {connect} from 'react-redux';
import '../stylesheet/navbar.scss'
import { grabACategory } from '../redux/actions';
import ProductCard from '../components/ProductCard';
import '../stylesheet/category.scss'


class CategoryPage extends Component {

    componentDidMount() {
        this.props.grabACategory(this.props.match.params.id)
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.props.grabACategory(this.props.match.params.id)
        }
    }

        
        
    mapOverProducts = () => {  
            if  (this.props.category.products) {
            return this.props.category.products.map((product) => {
                return <ProductCard key={product.id} history={this.props.history} product={product} />
            })
        }
    }
    
    
    render() {  
              console.log(this.props);
              
        return (
            <div className="featured-products category-page">
            <div className="category-header">
                    <h1>{this.props.category.name}</h1>
                </div>
                <div className="featured-header">
                   
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
        )
    }
}


    const mapStateToProps = state => ({
        // current_site_user: state
        state: state,
        category: state.category
    })

    const mapDispatchToProps = dispatch => ({
        grabACategory: (category_id) => dispatch(grabACategory(category_id))
    }) 

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)