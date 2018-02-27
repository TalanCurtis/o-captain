import React from 'react';
import {Link} from 'react-router-dom';

function Auth() {
    return (
        <div className='Auth'>
            <Link to='/Classes'><button>Login</button></Link>
        </div>
    )
}

export default Auth;