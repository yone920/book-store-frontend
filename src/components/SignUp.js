import React, { Component } from 'react'
import {connect} from 'react-redux';
import {userPostFetch} from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheet/signup.scss'


class SignUp extends Component {
    
    state = {
        name: "",
        email: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userPostFetch(this.state)
        this.props.history.push('/')
        
    }
    render() {
        
        return (
            <div className="signup-container">
                <div className="signup-wrapper">
                    <div className="signup-header">
                        SignUp <FontAwesomeIcon  icon="user-plus"></FontAwesomeIcon>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}  placeholder='Name'/>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}  placeholder='Email'/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}  placeholder='password' />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})


export default connect(null, mapDispatchToProps)(SignUp)