import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addTable } from "../utils/api";

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


    return (
    <div>

        <form>
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