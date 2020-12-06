import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

function Event(props) {
    var eventContract = props.bc.contracts.event;
    
    const [totalEvent, settotalEvent] = useState(0)
    const [eventId, seteventId] = useState('') 
    const history = useHistory()
    const [eventData, seteventData] = useState("")

    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.getEventsCount().call()
            return result
        }

        getEvents()
        .then((events)=>{
            console.log(events)
            settotalEvent(events)
            var id = parseInt(props.match.params.EventId)
            seteventId(id)
            if(!(id < events)){
                setTimeout(()=>{
                    history.push(`/events`);
                }, 6000)
            }
        })
    },[])

    const getEventData = () => {
        async function getData(){
            var result = await eventContract.methods.getEvent(eventId).call()
            return result
        }
        var data = []
        getData()
        .then((temp)=>{
            seteventData(temp)
        })
    }

    const getLocaleTime = (time) => {
        var utcSeconds = parseInt(time);
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        return d.toLocaleString()
    }

    return ( 
        <div className='event'>
            <div className='form'>
                {!(eventId < totalEvent) ? <>
                        <div> Your Event Id is wrong. And this page does not not exists. Redirecting </div>
                        <Loader
                            type="TailSpin"
                            color="#8D3B72"
                            height={100}
                            width={100}
                            timeout={6000}
                        />
                </> 
                :
                <>
                    {getEventData()}
                    <h2>Event Details</h2>
                    <table style={{display: "table"}}>
                        <tbody>
                                <tr><td className="right bold">Name :</td><td className="left">{eventData[0]}</td></tr>
                                <tr><td className="right bold">Date :</td><td className="left">{getLocaleTime(eventData[1])}</td></tr>
                                <tr><td className="right bold">Price :</td><td className="left">{eventData[2]}</td></tr>
                                <tr><td className="right bold">Limited Seats :</td><td className="left">{eventData[4] ? "Yes" : "No"}</td></tr>
                                {eventData[4] && <tr><td className="right bold">Seats:</td><td className="left">{eventData[5]}</td></tr> }
                        </tbody>
                    </table>
                    <h3>Description:</h3>{eventData[7]}
                    <hr></hr>
                    <button>
                        Buy Ticket
                    </button>
                </>
                }
            </div>
        </div>
        )
}

export default Event
