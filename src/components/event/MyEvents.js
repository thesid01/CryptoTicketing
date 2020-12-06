import React, { useEffect, useState } from 'react'

function MyEvents(props) {

    var eventContract = props.bc.contracts.event;
    var account = props.bc.accounts[0]
    const [allData, setallData] = useState({})
    useEffect(() => {
        async function getEvents(){
            var result = await eventContract.methods.eventsOf(account).call()
            return result
        }

        async function getData(id){
            var result = await eventContract.methods.getEvent(parseInt(id)).call()
            var dummy = allData
            dummy[id] = result
            setallData(dummy);
            return result
        }

        getEvents().then((data)=>{
            for(var i of data){
                getData(i)
            }
        })
    },[])
    return (
        <>
            My Events
        </>
    )
}

export default MyEvents
