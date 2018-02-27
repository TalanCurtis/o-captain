import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';
import { getClasses } from '../reducers/classes_reducer';

class Header extends Component {
    componentDidMount() {
        // TODO : Auth me. Make sure user is authorized and authenticated
        // Get User info then get all my class information from db with that user id.
        this.props.getUser().then(res=> this.props.getClasses(this.props.user.id))
    }

    handleLogout() {
        console.log('LogOut pushed')
    }
    handleBack() {
        console.log('Back pushed')
    }

    render() {
        return (
            <div className='Header'>
                <button onClick={() => this.handleBack()}>Back</button>
                <h1>{this.props.title}</h1>
                <button onClick={() => this.handleLogout()}>Logout</button>
            </div>
        )
    }
}

const outputActions = {
    getUser,
    getClasses
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, outputActions)(Header);