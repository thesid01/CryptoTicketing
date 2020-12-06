import React, { useEffect, useState } from 'react'
import logo from '../../logo.png'

function MyEvents(props) {

    var eventContract = props.bc.contracts.event;
    var account = props.bc.accounts[0]
    const [allData, setallData] = useState([])
    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.eventsOf(account).call()
            return result
        }

        async function getData(id){
            var result = await eventContract.methods.getEvent(parseInt(id)).call()
            setallData(prevData => [...prevData, result])
            return result
        }

        getEvents().then((data)=>{
            for(var i of data){
                getData(i)
            }
        })
    },[])

    const getLocaleTime = (time) => {
        var utcSeconds = parseInt(time);
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        return d.toLocaleString()
    }

    return (
        <div className='event'>
            <div>
                <ul className="ul">
                    {allData.map((ele, index)=>{
                        return (
                        <li key={index} className="li">
                            <img alt="event img" src={logo} className="img">
                            </img>
                            <h2 style={{fontWeight:"400"}}>
                                {ele["name"]}
                            </h2>
                            <div>
                                {getLocaleTime(ele["time"])}
                            </div>
                            <div>
                                {ele["limited"] && <>Limited Seats { ele["seats"]}</>}
                            </div>
                            <div className="form">
                                <button>Buy Ticket</button>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyEvents
