const knex = require("../db/connection")

function list() {
    return knex("reservations").select("*")
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