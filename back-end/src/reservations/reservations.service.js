const knex = require("../db/connection")

function list(date) {
    return knex("reservations")
            .select("*")
            .where({reservation_date: date})
            .then(response => {
             return  response.sort((a, b) => { return a.reservation_time.localeCompare(b.reservation_time)})
            })
}

function post(reservation) {
    return knex("reservations")
            .insert(reservation)
            .returning("*")
            .then(returned => returned[0])
}

module.exports = {
    list,
    post
}