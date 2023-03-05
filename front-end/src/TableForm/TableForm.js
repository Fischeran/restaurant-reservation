import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addReservation, addTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function TableForm() {
    const initialFormData = {
        "table_name": "",
        "capacity": ""
    }

    const history = useHistory()

    const [formData, setFormData] = useState(initialFormData)
    const [oneChar, setOneChar] = useState(false)
    const [tableError, setTableError] = useState(null)

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
        if (formData.table_name.length === 1) {
            setOneChar(true)
            return
        }
        try {
        await addTable(formData, controller.signal)} catch (error) {
            setTableError(error)
        }
        
        history.push('/dashboard')
    }


    return (
    <div className="ml-5">
        {oneChar === true && <h3 className="alert alert-danger">Table Name must be longer than one character</h3>}
        <ErrorAlert error={tableError} />
        <form className="container" onSubmit={(event) => submitHandler(event)}>

        <div className="row mt-5 mb-2">    
        <label for="table_name">table name:</label>
        <input className="ml-3" name="table_name" value={formData.table_name} onChange={handleChange} required />
        </div>

        <div className="row mb-2 ml-2">
        <label for="capacity">capacity:</label>
        <input className="ml-3" name="capacity" value={formData.capacity} onChange={handleChange} required />
        </div>

        <div className="row p-3">
        <button className="btn btn-primary" type="submit">SUBMIT</button>
        <button className="ml-3 btn btn-danger" type="cancel" onClick={() => history.goBack()}>CANCEL</button>
        </div>

        </form>
    </div>
    )
}


export default TableForm