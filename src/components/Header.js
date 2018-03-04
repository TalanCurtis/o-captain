import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    componentDidMount() {
        // TODO : Auth me. Make sure user is authorized and authenticated
        // Get User info then get all my class information from db with that user id.
        this.props.getUser()
    }

    handleLogout() {
        console.log('LogOut pushed')
    }
    handleBack() {
        console.log('Back pushed')
        this.props.history.goBack()
    }

    render() {
        return (
            <div className='Header'>
                <button onClick={() => this.handleBack()}>Back</button>
                <h2>{this.props.title}</h2>
                <button onClick={() => this.handleLogout()}>Logout</button>
            </div>
        )
    }
}

const outputActions = {
    getUser,
}

function mapStateToProps(state) {
    return state
}

// export default connect(mapStateToProps, outputActions)(Header);
export default withRouter(connect(mapStateToProps, outputActions)(Header));