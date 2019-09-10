import React, { Component } from 'react'

export default class Profile extends Component {

    state = {
        current_site_user: {}
    }
    componentDidMount() {
        if (!localStorage.token) {
            this.props.history.push('./login')
            return
        }

        // fetch()

    }


    render() {        
        return (
            <div>
                <h3>This is profile</h3>
            </div>
        )
    }
}
