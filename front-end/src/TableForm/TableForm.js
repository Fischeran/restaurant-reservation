import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addReservation, addTable } from "../utils/api";


function TableForm() {
    const initialFormData = {
        "table_name": "",
        "capacity": ""
    }

    const history = useHistory()

    const [formData, setFormData] = useState(initialFormData)

    const handleChange = ({ target }) => {
    
        setFormData({
            ...formData,
            [target.name]: target.value
        })
        console.log(target.value)
    }

    async function submitHandler(event) {
        let controller = new AbortController()
        event.preventDefault();
        if (formData.table_name.length === 1) {return window.alert("table name must be more than 1 character")}
        await addTable(formData, controller.signal)
        
        history.push('/dashboard')
    }


    return (
    <div>

        <form onSubmit={(event) => submitHandler(event)}>
        <label for="table_name">table name:</label>
        <input name="table_name" value={formData.table_name} onChange={handleChange} required />

        <label for="capacity">capacity:</label>
        <input name="capacity" value={formData.capacity} onChange={handleChange} required />

        <button type="submit">SUBMIT</button>
        <button type="cancel" onClick={() => history.goBack()}>CANCEL</button>

        </form>
    </div>
    )
}


export default TableForm