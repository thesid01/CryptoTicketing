import React from 'react'
import {
    Switch,
    Route,
} from "react-router-dom";
import MyEvent from '../event/MyEvents'
import Ticket from '../event/MyTickets'
import CreateEvent from '../event/CreateEvent'
import FindEvent from '../event/FindEvent'
import Event from '../event/Event'

import './MainContent.css'

function MainContent(props) {
    return (
        <div className='mainContent'>
            <Switch>
                <Route exact path='/'>
                    <div className='welcome'>Welcome To CryptoTicketing BlockChain Network <br/> 🎟️</div>
                </Route>
                <Route path='/my-events' component={(prop)=><MyEvent {...prop} {...props} />} />
                <Route path='/my-tickets' component={Ticket} />
                <Route path='/events' component={(prop)=> <FindEvent {...prop} {...props} />} />
                <Route path="/event/:EventId" component={(prop)=> <Event {...prop} {...props} />} />
                <Route path='/create-event' component={(prop)=><CreateEvent {...prop} {...props}/>} />
            </Switch>
        </div>
    )
}

export default MainContent
