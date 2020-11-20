import React, { useState } from 'react'
import './event.css'

function CreateEvent() {
    
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [datetime, setdatetime] = useState('')
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
    const handleDatetimeChange = (e) =>{
        setdatetime(e.target.value)
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

    const createEvent = () => {

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

                <input
                    type="datetime-local" 
                    className="form-field animation a4"
                    placeholder="Choose Event Date and Time"
                    value={datetime}
                    onChange={handleDatetimeChange}
                    min={(new Date()).toISOString().split('.')[0]}
                />

                <input
                    type='number' 
                    className="form-field animation a4"
                    placeholder="Ticket Price (in eth)"
                    value={price}
                    onChange={handlePriceChange}
                    min='0.00000001'
                />

                <div className='form-field'>
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
