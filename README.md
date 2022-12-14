# Periodic Tables

Periodic tables is used for resteraunt owners to be able to add tables and maintain reservations. It uses REST principals in design and responds to different HTTP requests.


## Dashboard

The Dashboard is the home page of the site which lists all current tables, as well as reservations for a queried date. The /dashboard path accepts a date query path which if empty defaults to todays date. An example of an acceptable entry would be /dashboard?date=03-27-2022

## Tables 

Tables are listed on the home page of the dashboard while also displaying attributes of the table including the table name, capcity, whether they are free or occupied.

## New tables

New tables can be added via the /tables/new path in which the table simply needs and name and a capacity, submiting stores the table in the database and pushes the user back to the home page

important: single letter table names are not accepted

## Reservations

Reservations are also listed on the home page if the reservation is occuring on the given query date and does not have a status of "finished". New reservations display 3 buttons each with there own functionality

seat: this button takes you to /reservations/:reservation_id/seat a screen in which you can pick a table from the dropdown for the reservation to be seated at. Clicking submit adds the reservation ID to the tables table in the data base marking the table as "occupied" and marking the status of the reservation as "seated"

cancel: the cancel button cancels the reservation, displaying a warning asking the user to confirm cancelation, and then sets the status to "cancelled" and refreshes the dashboard for the entered query data with the cancelled reservation being removed

Edit: the edit button takes you back to the same form used to create the reservation pre-filled with the content of the reservation allowing you to make any neccesary changes to the reservation, submitting updates the reservation.

## Search

The search field allows you to search a reservation by phone number, formatting does not matter as long as the 10 digit phone number is entered, searching a phone number returns a list of reservations matching the searched phone number 
