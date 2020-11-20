import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import Event from '../event/MyEvents'
import Ticket from '../event/MyTickets'
import CreateEvent from '../event/CreateEvent'
import FindEvent from '../event/FindEvent'

import './MainContent.css'

function MainContent() {
    return (
        <div className='mainContent'>
            <Switch>
                <Route exact path='/'>
                    <div className='welcome'>Welcome To CryptoTicketing BlockChain Network <br/> 🎟️</div>
                </Route>
                <Route path='/my-events' component={Event} />
                <Route path='/my-tickets' component={Ticket} />
                <Route path='/events' component={FindEvent} />
                <Route path='/create-event' component={CreateEvent} />

            </Switch>
        </div>
    )
}

export default MainContent
