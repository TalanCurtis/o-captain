import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';
import { withRouter, Link } from 'react-router-dom';
import logout from '../images/logout.png'

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
                <div className='title'>
                    <h1>{this.props.title}</h1>
                </div>
                    <button className='LogoutButton' onClick={() => this.handleLogout()}>
                     <Link to='/' >
                        
                        <img src={logout} alt="" height='30' width='30' />
                    </Link>
                </button>
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