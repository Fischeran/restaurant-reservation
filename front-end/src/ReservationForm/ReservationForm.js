import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationForm() {

/* 
Questions:
Need to change onClick in cancel to push to a specific page, maybe dashboard?

*/    

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
}

const submitHandler = ({}) => {
    //save the new reservation
    //display dashboard page showing the new reservation

}





return ( 
<form onSubmit={submitHandler}>

    <label for="first_name">First Name:</label>
    <input name="first_name" value={formData.first_name} onChange={handleChange}  />

    <label for="last_name">Last Name:</label>
    <input name="last_name" value={formData.last_name} onChange={handleChange} />

    <label for="mobile_number">Mobile Number:</label>
    <input name="mobile_number" value={formData.mobile_number} onChange={handleChange} />

    <label for="reservation_date">Reservation Date:</label>
    <input name="reservation_date" value={formData.reservation_date} onChange={handleChange} />

    <label for="reservation_time">Reservation Time:</label>
    <input name="reservation_time" value={formData.reservation_time} onChange={handleChange} />

    <label for="people">People:</label>
    <input name="people" value={formData.people} onChange={handleChange} />

    <button type="submit">SUBMIT</button>
    <button type="cancel" onClick={() => history.goBack()}>CANCEL</button>
    
</form>
)}



export default ReservationForm