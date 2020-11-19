import React from 'react'
import './SideBar.css'

function SideBar() {
    return (
        <div className='sideBar'>
            <ul className='sideBar-ul'>
                <li>Find Events</li>
                <li>Create Events</li>
                <li>My Events</li>
                <li>My Tickets</li>
            </ul>
        </div>
    )
}

export default SideBar
