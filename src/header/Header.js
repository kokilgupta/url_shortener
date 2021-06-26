import React from 'react';
import './Header.css';
import { useHistory } from 'react-router';

const Header = () => {
    const history = useHistory();
    return (
        <div className={'header'} onClick={() => history.push('/')}>
            Shortly
        </div>
    )
}

export default Header;