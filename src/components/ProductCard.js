import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../stylesheet/product_card.scss'

class ProductCard extends Component {

    // addToCartButton = () => {
    //     return localStorage.token ? <button>View Product</button> : <button>View Product</button>;
    // }

    descriptionSummary = () => {
        let desc = this.props.product.description.slice(0, 20)
        return `${desc}...`
    }

    handleClick = () => {
        this.props.history.push(`/products/${this.props.product.id}`)
    }

    returnImage = () => {
        return `../img/${parseInt(this.props.product.main_image)}.jpg`
    }

    render() {
        const image_name = parseInt(this.props.product.main_image)
        console.log(image_name);

        return (
                <article className="card" >
                    <Link href=" " onClick={this.handleClick}>
                        <picture className="thumbnail">
                            <img src={this.returnImage()} alt="A banana that looks like a bird"></img>
                        </picture>
                        <div className="card-content">

                            <h2>{this.props.product.name}</h2>
                            <p>{this.descriptionSummary()}</p>
                            <h2>${this.props.product.price_in_cents}</h2>
                            {/* {this.addToCartButton()} */}
                        </div>
                    </Link>
                </article>
        )
    }
}


export default ProductCard