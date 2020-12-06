import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

function FindEvent(props) {
    var eventContract = props.bc.contracts.event;
    
    const [totalEvent, settotalEvent] = useState(0)
    const [eventId, seteventId] = useState('')
    const { addToast } = useToasts()
    const history = useHistory()

    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.getEventsCount().call()
            return result
        }
        getEvents().then((events)=>{
            settotalEvent(events)
        })
    })

    const handleFindEvent = () => {
        if(parseInt(eventId) >= parseInt(totalEvent)){
            addToast('No such event Exists.', {
                appearance: 'warning',
                autoDismiss: true,
            })
        }else{
            history.push(`/event/${eventId}`);
        }
    }

    return (    
        <div className='event'>
            <div className='form'>
                Total Events Available : {totalEvent}
                <h2>Find Events by Id</h2>
                <input
                    type="number"
                    className="form-field animation a3"
                    placeholder="Event Id"
                    value={eventId}
                    onChange={(e)=>{seteventId(e.target.value)}}
                    maxLength='50'
                />

                {/* <NavLink to={`/event/${eventId}`} style={{color:"white", textDecoration:'none'}}> */}
                    <button
                    onClick={handleFindEvent}
                        >Find By Id
                    </button>
                {/* </NavLink> */}
            </div>
        </div>
    )
}

export default FindEvent
