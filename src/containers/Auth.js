import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'

function Auth() {
    return (
        <div className='Auth'>
            <div>
                <h4>O-Captain</h4>
                <img src={Logo} alt="" height='200' width='200' />
                <Link to='/Classes'style={{ textDecoration: 'none' }} ><button className='LoginButton' >Login</button></Link>
            </div>
        </div>
    )
}

export default Auth;