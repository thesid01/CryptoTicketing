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

function MainContent(props) {
    return (
        <div className='mainContent'>
            <Switch>
                <Route exact path='/'>
                    <div className='welcome'>Welcome To CryptoTicketing BlockChain Network <br/> 🎟️</div>
                </Route>
                <Route path='/my-events' component={()=><Event bc={props.bc} />} />
                <Route path='/my-tickets' component={Ticket} />
                <Route path='/events' component={()=> <FindEvent bc={props.bc} />} />
                <Route path='/create-event' component={()=><CreateEvent bc={props.bc}/>} />

            </Switch>
        </div>
    )
}

export default MainContent
