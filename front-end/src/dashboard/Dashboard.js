import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { listReservations } from "../utils/api";
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
  const [reservationsError, setReservationsError] = useState(null);
  const [dashDate, setDashDate] = useState(useQuery().get("date") || today())
 
  console.log(reservations)
  useEffect(loadDashboard, [dashDate]);

  function loadDashboard() {
    console.log(dashDate)
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: dashDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  
  /*
    list all reservations for one date only. (E.g. if the URL is /dashboard?date=2035-12-30 then send a GET to /reservations?date=2035-12-30 
    to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.

    display next, previous, and today buttons that allow the user to see reservations on other dates

    display any error messages returned from the API
  */


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
