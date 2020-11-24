import React, { useState, useEffect } from 'react'

function FindEvent(props) {
    var eventContract = props.bc.contracts.event;
    
    const [totalEvent, settotalEvent] = useState(0)

    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.getEventsCount().call()
            return result
        }
        getEvents().then((events)=>{
            settotalEvent(events)
        })
    })

    return (    
        <div className='event'>
                Total Events Available : {totalEvent}
        </div>
    )
}

export default FindEvent
