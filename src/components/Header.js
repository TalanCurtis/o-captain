import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user_reducer';
import { withRouter , Link} from 'react-router-dom';
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
                    <h2>{this.props.title}</h2>
                </div>
                <Link to='/'><button onClick={() => this.handleLogout()}><img src={logout} alt="" height='30' width='30'/></button></Link>
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