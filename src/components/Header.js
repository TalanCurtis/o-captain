import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';

class Header extends Component {
    componentDidMount() {
        // TODO : Auth me. Make sure user is authorized and authenticated
        this.props.getUser()
        console.log('header mounted')
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
                <h1>{this.props.user.info.first_name}</h1>
                <button onClick={() => this.handleLogout()}>Logout</button>
            </div>
        )
    }
}

const outputActions = {
    getUser
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, outputActions)(Header);