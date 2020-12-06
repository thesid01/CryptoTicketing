import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';

import './event.css'

function CreateEvent(props) {

    var eventContract = props.bc.contracts.event,
        accounts = props.bc.accounts[0];

    // console.log(eventContract.methods.createEvent("event", 1637781633, 1, false, true, 123, "idonotknow").send({from: accounts}))

    var nextDateAvailable = new Date()
    nextDateAvailable.setDate(nextDateAvailable.getDate() + 1)

    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [datetime, setdatetime] = useState(nextDateAvailable)
    const [price, setprice] = useState('')
    const [isLimited, setisLimited] = useState(false)
    const [seats, setseats] = useState('')
    const [file, setfile] = useState(null)
    
    const handleNameChange = (e) =>{
        setname(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setdescription(e.target.value)
    }
    const handlePriceChange = (e) =>{
        setprice(e.target.value)
    }
    const handleIsLimitedChange = (e) =>{
        setisLimited(e.target.checked)
    }
    const handleSeatsChange = (e) => {
        setseats(e.target.value)
    }
    const handleFileChange = (e) => {
        setfile(e.target.files[0])
    }

    const createEvent = async () => {
        /* Create Event function parameters
            string memory _name,
            uint _time,
            uint _price,
            bool _token,
            bool _limited,
            uint _seats,
            string memory _ipfs
        */
        var epoch_datetime = parseInt((new Date(datetime)).getTime()/1000.0)
        console.log(name,epoch_datetime,parseInt(price),false,isLimited,parseInt(seats),'i do not know');
        var result = await eventContract.methods
                            .createEvent(name, epoch_datetime, parseFloat(price), false, isLimited, parseInt(123), "idonotknow")
                            .send({from: accounts})
        console.log(result)
    }

    return (
        <div className='event'>
            <div className="form">
                <h2>Create Event</h2>
    
                <input
                    type="text"
                    className="form-field animation a3"
                    placeholder="Event Name"
                    value={name}
                    onChange={handleNameChange}
                    maxLength='50'
                />
                
                <textarea
                    className='form-field'
                    placeholder='Event Description'
                    style={{padding: '15px'}}
                    value={description}
                    onChange={handleDescriptionChange}
                >
                </textarea>

                <DateTimePicker
                    onChange={setdatetime}
                    value={datetime}
                    className="form-field animation a4 date"
                    format="dd-MM-yyyy h:mm:ss a"
                    minDate={nextDateAvailable}
                />

                <input
                    type='number' 
                    className="form-field animation a4"
                    placeholder="Ticket Price (in wei)"
                    value={price}
                    onChange={handlePriceChange}
                    min='1'
                />

                <div className='form-field' style={{backgroundColor:'white'}}>
                    <input
                        id='limited'
                        type='checkbox'
                        value={isLimited}
                        onChange={handleIsLimitedChange}
                    />
                    <label htmlFor='limited'>Limited Seats</label>
                </div>

                <input
                    type='number' 
                    className="form-field animation a4"
                    placeholder="Seats Available"
                    value={seats}
                    onChange={handleSeatsChange}
                    min='1'
                    disabled={!isLimited}
                />

                <input
                    id='eventImage'
                    name='eventImage'
                    type='file'
                    onChange={handleFileChange}
                    style={{display:'none'}}
                />
                <div className='form-field animation a4'>
                    <label
                        htmlFor='eventImage'
                        style={{width:'100%'}}>
                        <span role='img' aria-label='upload'>☁️</span> Upload an image for event</label>
                </div>
                <small style={{margin:'5px'}}>
                    {file ? `Choosen file: ${file.name}`:null}
                </small>

                <p className="animation a5"></p>
                <button
                    className="animation a6"
                    onClick={createEvent}>Create Event</button>
            </div>
        </div>
    )
}

export default CreateEvent
