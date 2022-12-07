import React from "react";


function ReservationList({ reservations }) {
     
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
                    </div>
        
                  </div>
                )
              })}
            </div>
        )
 }     


export default ReservationList