const knex = require("../db/connection")

function post(table) {
    return knex("tables")
            .insert(table)
            .returning("*")
            .then(returned => returned[0])
}

function list() {
    return knex("tables")
            .select("*")
            .then(response => {
                return  response.sort((a, b) => { return a.table_name.localeCompare(b.table_name)})
               })
}

function readRes(reservationId) {
    return knex("reservations")
            .select("*")
            .where({ reservation_id: reservationId })
            .first()

}

function read(table_id) {
    return knex("tables")
            .select("*")
            .where({ table_id })
            .first()

}




module.exports = {
    post,
    list,
    readRes,
    read
}