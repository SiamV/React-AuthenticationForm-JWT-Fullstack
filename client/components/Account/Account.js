import React from 'react';
import {NavLink} from 'react-router-dom';

const Account = () => {
    return (
        <div>
            <NavLink to={'/login'}>Login</NavLink>
        </div>
    )
}

export default Account;