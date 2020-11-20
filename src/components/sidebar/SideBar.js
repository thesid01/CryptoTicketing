import React from 'react'
import { NavLink } from "react-router-dom";
  
import './SideBar.css'

function SideBar() {
    return (
        <div className='sideBar'>
            <ul className='sideBar-ul'>
                <li><NavLink activeClassName='activePath' to="/events">Find Events</NavLink></li>
                <li><NavLink activeClassName='activePath' to="/create-event">Create Events</NavLink></li>
                <li><NavLink activeClassName='activePath' to="/my-events">My Events</NavLink></li>
                <li><NavLink activeClassName='activePath' to="/my-tickets">My Tickets</NavLink></li>
            </ul>
        </div>
    )
}

export default SideBar
