import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

function Event(props) {
    var eventContract = props.bc.contracts.event,
    accounts = props.bc.accounts[0];
    
    const history = useHistory()
    const { addToast } = useToasts()

    const [totalEvent, settotalEvent] = useState(0)
    const [eventId, seteventId] = useState('')
    const [eventData, seteventData] = useState("")
    const [gotData, setgotData] = useState(false)
    const [image, setimage] = useState('')
    const [des, setdes] = useState('')
    const [allData, setallData] = useState([])

    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.getEventsCount().call()
            return result
        }

        async function getTickets(id){
            var result = await eventContract.methods.ticketsOfEvent(id).call()
            return result
        }

        async function getData(id){
            var result = await eventContract.methods.getTicket(parseInt(id)).call()
            result['__id'] = id
            setallData(prevData => [...prevData, result])
            return result
        }

        getEvents()
        .then((events)=>{
            settotalEvent(events)
            var id = parseInt(props.match.params.EventId)
            seteventId(id)
            getTickets(id)
            .then((data)=>{
                for(var id in data){
                    getData(id)
                }
            })
            if(!(id < events)){
                setTimeout(()=>{
                    history.push(`/events`);
                }, 6000)
            }
        })
    },[])

    const isOld = (time) => {
        var utcSeconds = parseInt(time);
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        var sec = (new Date()).getTime()
        return sec >= d.getTime()
    }

    const getEventData = () => {
        async function getData(){
            var result = await eventContract.methods.getEvent(props.match.params.EventId).call()
            return result
        }
        getData()
        .then(async (temp)=>{
            seteventData(temp)
            if(gotData === false){
                setgotData(true)
                fetch(`http://localhost:8080/ipfs/${temp[7]}`)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    setdes(data["text"])
                    
                    var arrayBufferView = new Uint8Array( data["image"]["data"] );
                    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL( blob );
                    setimage(imageUrl)

                })
            }
        })
    }

    const getLocaleTime = (time) => {
        var utcSeconds = parseInt(time);
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        return d.toLocaleString()
    }

    const buyTicket = () => {
        async function buyTicket() {
            var result = await eventContract.methods.buyTicket(props.match.params.EventId).send({from: accounts, value: parseInt(eventData[2])})
            return result
        }
        buyTicket().then(()=>{
            addToast('Ticket Bought.', {
                appearance: 'success',
                autoDismiss: true,
            })
            history.push('/')
        })
    }

    const refundApprove = (e) => {
        var id = e.target.getAttribute('data-id')
        async function approveRefund(id){
            var result = await eventContract.methods.approveRefund(id).send({from:accounts})
            return result
        }
        try {
            approveRefund(id)
            addToast('Refund successful.', {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            addToast('Error Occurred Try Again.', {
                appearance: 'success',
                autoDismiss: true,
            })
        }
    }

    return ( 
        <div className='event' style={{textAlign:"center"}}>
            {(eventId < totalEvent) && <img src={image}></img> }
            {(eventId < totalEvent) && image === "" && <Loader
                type="TailSpin"
                color="#8D3B72"
                height={50}
                width={50}
            />}
            <div className='form'>
                {!(eventId < totalEvent) ? <>
                        <div> Your Event Id is wrong. And this page does not not exists. Redirecting </div>
                        <Loader
                            type="TailSpin"
                            color="#8D3B72"
                            height={100}
                            width={100}
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
                    <h3>Description:</h3>{des === "" && <Loader
                        type="TailSpin"
                        color="#8D3B72"
                        height={50}
                        width={50}
                    />}{des}
                    <hr></hr>
                    {props.location.search === "?ref=_ref" || isOld(eventData[1]) ? 
                    ""
                    :
                    <button onClick={buyTicket}>
                        Buy Ticket
                    </button>}
                </>
                }
                {props.location.search === "?ref=_ref" && <h2>Refund Requests</h2> }
                {props.location.search === "?ref=_ref" && allData.map((ele, index)=>{
                        return (
                        ele[3] && ele[2] && <li className="li" key={index}
                            style={{'height': 'auto','padding': '15px','flexDirection': 'row','display': 'flex','flexFlow': 'column'}} >
                            <div className="form">
                                Ticket Id - {ele['__id']}
                                <button data-id={ele['__id']} onClick={refundApprove}>Refund</button>
                            </div>
                        </li>)
                    })}
            </div>
        </div>
        )
}

export default Event
