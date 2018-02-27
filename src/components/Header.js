import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    componentDidMount() {
        // TODO : Auth me. Make sure user is authorized and authenticated
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
                <h1>Title</h1>
                <button onClick={() => this.handleLogout()}>Logout</button>
            </div>
        )
    }
}

const outputActions = {
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, outputActions)(Header);