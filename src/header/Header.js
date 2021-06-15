import React from 'react';
import './Header.css';
import { useHistory } from 'react-router';

const Header = () => {
    const history = useHistory();
    return (
        <div className={'header'} onClick={() => history.push('/')}>
            Shorten URL
        </div>
    )
}

export default Header;