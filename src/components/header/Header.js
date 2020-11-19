import React, { useState } from 'react'
import './Header.css'

function Header() {
    const [open, setopen] = useState(false);

    const handleMenuClick = () => {
        var sidebar = document.getElementsByClassName('sideBar')[0]
        if(!open){
            sidebar.style.display = 'flex';
        }else{
            sidebar.style.display = 'none';
        }
        setopen(!open)
    }

    return (
        <div className='header'>
            <div className='header-name'>
                {open ?
                <span className='menu-icon' onClick={handleMenuClick}> &#10008;</span>
                :<span className='menu-icon' onClick={handleMenuClick}> &#9776;</span>
                }
                CryptoTicketing <span role="img" aria-label="ticket">🎫</span></div>
        </div>
    )
}

export default Header
