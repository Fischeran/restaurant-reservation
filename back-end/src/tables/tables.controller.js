const service = require("./tables.service")

async function post(req, res) {
    const data = await service.post(req.body.data)
    res.status(201).json({ data })
}

async function list(req, res) {
    const data = await service.list()
    res.json({ data })
}

function hasValidBody(bodyType) {
    return function (req, res, next) {
      const { data = {}} = req.body
      if (data[bodyType]) {
        return next()
      }
      next({ status: 400, message: `Must Include a ${bodyType}`})
    }
  }
  
  function empty(bodyType) {
    return function (req, res, next) {
      const { data = {}} = req.body
  
      if (data[bodyType].toString().length === 0) { return next({ status: 400, message: `${data[bodyType]} must not be empty`})}
  
      next()
    }
  }

  function checkZero(req, res, next) {
    const { data = {}} = req.body;
  const check = data["capacity"];

  if (check === 0) {return next({status: 400, message: "Capacity must not be 0"})}

  next()
  }

  function tableNameLength(req, res, next) {
    const { data = {}} = req.body;
    const check = data["table_name"];

    if (check.length === 1) { return next({status: 400, message: "table_name must be greater than one character"})}
    
    next()
}

function validateCapacity(req, res, next) {
    const { data = {}} = req.body;
    const check = typeof data["capacity"];
  
    console.log(check)

    if(check !== "number") {return next({status: 400, message: "capacity must be a valid number"})}
   
  
    next()

}

async function validReservation(req, res, next) {
    const { data = {}} = req.body;
    const check = data["reservation_id"];

    const reservation = await service.readRes(check);
   
    if (!reservation) { return next({ status: 404, message: `reservation_id ${check} does not exist`})}

    
    res.locals.people = reservation.people
    next()
}

async function sufficientCapacity(req, res, next) {
    const people = res.locals.people;
    const table = await service.read(req.params.table_id);
    const capacity = table.capacity;

    if (people > capacity) {return next({status: 400, message: "table does not have sufficient capacity"})}

    res.locals.table = table
    next()


}

async function isReserved(req, res, next) {
    const table = res.locals.table;

    if (table.reservation_id) {return next({status: 400, message: "table is reserved"})}

    next()

}




module.exports = {
    post: [
            hasValidBody("table_name"),
            empty("table_name"),
            hasValidBody("capacity"),
            empty("capacity"),
            checkZero,
            tableNameLength,
            validateCapacity,
            isReserved,
            post],
    list,
    put: [
        hasValidBody("reservation_id"), 
        validReservation,
        sufficientCapacity
            ]
}