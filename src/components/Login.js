import React, { Component } from 'react'
import {connect} from 'react-redux';
import {userLoginFetch} from '../redux/actions';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../stylesheet/login.scss'


class Login extends Component {

    state = {
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
        this.props.userLoginFetch(this.state)
        this.props.history.push('/')
    }

    handleClick = event => {
        this.props.history.push('/signup')
    }

    render() {                
        return (
            <div className="book-login">
                <div className="login-wrapper">
                    <div className="login-header">
                        Login <FontAwesomeIcon  icon="sign-in-alt"></FontAwesomeIcon>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange}  placeholder='Email'/>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}  placeholder='password' />
                        <input type="submit" value="Submit" />
                    </form>
                    <div className="no-account">
                        No Account ? <br></br>
                        <div> <Link  onClick={this.handleClick}><FontAwesomeIcon  icon="user-plus"></FontAwesomeIcon> Create Account </Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(Login)