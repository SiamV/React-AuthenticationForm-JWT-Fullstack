import React from 'react';
import {NavLink} from 'react-router-dom';


const MainMenu = () => {
    return (
        <nav>
            <NavLink to={'/articles'}>Articles</NavLink>
        </nav>
    )
}

export default MainMenu;