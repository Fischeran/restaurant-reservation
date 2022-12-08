import React from "react";
import { Link , useHistory} from "react-router-dom";
import { cancelReservation } from "../utils/api";



function ReservationList({ reservations }) {
const history = useHistory();


  async function cancel(event) {
      
      const abortController = new AbortController()
      
     if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        await cancelReservation(event.target.name, abortController.signal)
        history.go(0)
      } 
  }
     
        return (
            <div className="row-md">
            {reservations.map(res => {
        
                return (
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{`${res.first_name} ${res.last_name} party of ${res.people}`}</h5>
                      <p className="card-text">time: {res.reservation_time}</p>
                      <p className="car-test" data-reservation-id-status={res.reservation_id}>{res.status}</p>
                      {res.status === "booked" &&  <a href={`/reservations/${res.reservation_id}/seat`}><button>seat</button></a>}
                      {res.status !== "cancelled" && <button name={res.reservation_id} data-reservation-id-cancel={res.reservation_id} onClick={(event) => cancel(event)}>Cancel</button>}
                      <Link to={`/reservations/${res.reservation_id}/edit`}><button>Edit</button></Link>
                    </div>
        
                  </div>
                )
              })}
            </div>
        )
 }     


export default ReservationList