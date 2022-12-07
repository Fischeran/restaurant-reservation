import React, { useEffect, useState } from "react";
import { useHistory , useParams } from "react-router-dom";
import { addReservation , updateReservation } from "../utils/api";
import { today } from "../utils/date-time";

function ReservationForm() {

/* 
Questions:
Need to change onClick in cancel to push to a specific page, maybe dashboard?

*/    
let controller = new AbortController()
const reservation_id = useParams()

let history = useHistory()    
const [past, setPast] = useState(false)
const [closed, setClosed] = useState(false)
const [time, setTime] = useState(false)

const initialFormData = {
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "reservation_date": "",
    "reservation_time": "",
    "people": "",
}

const [formData, setFormData] = useState(initialFormData)

const handleChange = ({ target }) => {
    
    setFormData({
        ...formData,
        [target.name]: target.value
    })
    console.log(target.value)
}

function compareTime(formTime){
    let open = "10:30"
    let close = "21:30"

    if(open.localeCompare(formTime) === 1) {
        return true
    }

    if (close.localeCompare(formTime) === -1) {
        return true 
    }

}


 async function submitHandler(event) {
    event.preventDefault()
    const day = new Date(formData["reservation_date"]).getDay()
    if (day === 1) {
            if (formData["reservation_date"].localeCompare(today()) === -1) {
                setPast(true);
            }
            if (compareTime(formData["reservation_time"])) {
                setTime(true)
            }

        setClosed(true);
        return
    }

    if (formData["reservation_date"].localeCompare(today()) === -1) {

        if (compareTime(formData["reservation_time"])) {
            setTime(true)
        }


        setPast(true);
        return
    }



    if (compareTime(formData["reservation_time"])) {
        setTime(true)
        return
    }

    if (reservation_id) {
    updateReservation(reservation_id, formData, controller.signal)
    history.push(`/dashboard?date=${formData.reservation_date}`)
    } else {

    addReservation(formData, controller.signal)
    history.push(`/dashboard?date=${formData.reservation_date}`)
    }

}





return ( 
<div>  
    {closed === true && <h3 className="alert alert-danger">Date must be on operating business day</h3>}
    {past === true && <h3 className="alert alert-danger">Date must not be in the past</h3>}
    {time === true && <h3 className="alert alert-danger">Time must be during business hours</h3>}
<form onSubmit={(event) => submitHandler(event)}>

    <label for="first_name">First Name:</label>
    <input name="first_name" value={formData.first_name} onChange={handleChange} required />

    <label for="last_name">Last Name:</label>
    <input name="last_name" value={formData.last_name} onChange={handleChange} required />

    <label for="mobile_number">Mobile Number:</label>
    <input name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />

    <label for="reservation_date">Reservation Date:</label>
    <input name="reservation_date" value={formData.reservation_date} onChange={handleChange} required type="date" />

    <label for="reservation_time">Reservation Time:</label>
    <input name="reservation_time" value={formData.reservation_time} onChange={handleChange} required type="time" />

    <label for="people">People:</label>
    <input name="people" value={formData.people} onChange={handleChange} required />

    <button type="submit">SUBMIT</button>
    <button type="cancel" onClick={() => history.push("/dashboard")}>CANCEL</button>
    
</form>
</div>  
)}



export default ReservationForm