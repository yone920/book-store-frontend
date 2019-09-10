import React, { Component } from 'react';
import { connect } from 'react-redux';


class ProductList extends Component {

    handleClick = () => {
        this.props.history.push(`/products/${this.props.product.id}`)
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <ul>
                    <li>
                        {this.props.product.name}
                    </li>     
                </ul>
            </div>
        );
    }
}


export default connect()(ProductList);