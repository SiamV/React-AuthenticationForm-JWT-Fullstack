import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logOutAC } from '../../redux/reducers/loginReducer'

const Account = () => {
    const isAuth = useSelector(s => s.login.isAuth);
    const dispatch = useDispatch();
    return (
        <div>
            {!isAuth && <NavLink to={'/login'}>Login</NavLink>}
            {isAuth && <div onClick={() => {dispatch(logOutAC())}}>LogOut</div>}
        </div>
    )
}

export default Account;