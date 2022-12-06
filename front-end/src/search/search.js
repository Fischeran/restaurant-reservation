import React, { useEffect, useState } from "react";





function Search() {

    const [mobile, setMobile] = useState("")

function handleChange({target}) {
    setMobile(target.value)
}

function submitHandler() {
    
}


    return (
        <form>
            <label to="mobile_number">Enter a customer's phone number</label>
            <input name="mobile_number" value={mobile} onChange={handleChange} />
            <button type="submit">Find</button>
        </form>



    )
}

export default Search