import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheet/navbar.scss'


class CategoryList extends Component {
    
    handleClick = event => {
        this.props.history.push(`/categories/${this.props.category.id}`)
    }
    
    render() {
        

        return (
            <div className="home-sidebar">
                {/* <ul key={this.props.category.id} onClick={this.handleClick}>
                    <li>{this.props.category.name}</li>
                </ul> */}
                
                <div className="menu">
                    <Link href=" " key={this.props.category.id} onClick={this.handleClick} className="item"> <FontAwesomeIcon icon="book"/>
                    {this.props.category.name}
                    </Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories
})


export default connect(mapStateToProps)(CategoryList)