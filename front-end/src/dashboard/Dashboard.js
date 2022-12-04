import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listReservations , listTables , freeTable} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
//{date was originally being imported}

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dashDate, setDashDate] = useState(useQuery().get("date") || today());
  
 
  
  useEffect(loadDashboard, [dashDate]);

  function loadDashboard() {
    
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: dashDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    
    listTables({}, abortController.signal)  
        .then(setTables)
      
    return () => abortController.abort();
  }

  async function finishHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      freeTable(event.target.name, abortController.signal)
    }
    

    
  }
   


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row-md">
      {reservations.map(res => {
        
        return (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{`${res.first_name} ${res.last_name} party of ${res.people}`}</h5>
              <p className="card-text">time: {res.reservation_time}</p>
              <a href={`/reservations/${res.reservation_id}/seat`}><button>seat</button></a>
            </div>

          </div>
        )
      })}
      </div>
      <div className="row-md">
       {tables.map(table => {
        return (
          <div className="card"> 
            <div className="card-body">
              <h5 className="card-title">{`${table.table_name} - capacity: ${table.capacity}`}</h5>
                 {table.reservation_id && <div><p className="card-text" data-table-id-status={`${table.table_id}`}>Occupied</p>
                  <button name={table.table_id} data-table-id-finish={table.table_id} onClick={(event) => finishHandler(event)} type="submit">Finish</button></div>
                 }
                 {!table.reservation_id && <p className="card-text" data-table-id-status={`${table.table_id}`}>Free</p>}
            </div>  
          </div>
        )

       })}
      </div>
      
    </main>
  );
}




export default Dashboard;
