import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addReservation } from "../utils/api";

function ReservationForm() {

/* 
Questions:
Need to change onClick in cancel to push to a specific page, maybe dashboard?

*/    
let controller = new AbortController()

let history = useHistory()    

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

 async function submitHandler(event) {
    event.preventDefault()
    addReservation(formData, controller.signal)
    history.push(`/dashboard?date=${formData.reservation_date}`)


}





return ( 
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
)}



export default ReservationForm