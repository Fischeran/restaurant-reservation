const service = require("./reservations.service")
const moment = require("moment")



/**
 * List handler for reservation resources
 */
 function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

async function list(req, res) {
  
  const date = req.query.date;
  const today = asDateString(new Date());
  console.log(date)
  
  if (date){
  const data = await service.list(date)
  res.json({data});} else {
    const data = await service.list(today)
  res.json({data});
  }
  
}

//adding properties validater

/*
const valid_properties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

function hasValidProperties(req, res, next) {
  const { data = {} } = req.body

  console.log(data)
  const invalidFields = Object.keys(data).filter(
    (field) => { return !valid_properties.includes(field)})

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(" ,")}`
    })
  }  
  next()
}
*/

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

function validateDateIsPresent(req, res, next) {
  const { data = {}} = req.body
  const today = asDateString(new Date())

  if (data["reservation_date"].localeCompare(today) === -1) {
    next({status: 400, message: "reservation_date must today or in the future"})
  }
  next()


}

function validateBussinessIsOpen(req, res, next) {
  const { data = {}} = req.body
  const day = new Date(data["reservation_date"]).getDay()

  if (day === 1) {
    next({status: 400, message: "reservation_date must be on an operating bussiness day, bussiness is closed on date of reservation"})
  }
  next()
}

function validateOpenTime(req, res, next) {
  const { data = {}} = req.body
  const time = data["reservation_time"]

  let open = "10:30"
  let close = "21:30"

  if (open.localeCompare(time) === 1) {
    next({status: 400, message: "reservation_time is during time business is closed "})
  }

  if (close.localeCompare(time) === -1) {
    next({status: 400, message: "reservation_time is during time business is closed "})
  }

  next()

}

function validateDate(req, res, next) {
  const { data = {}} = req.body

  if (moment(data["reservation_date"], 'YYYY-MM-DD', true).isValid()) {return next()} else { return next({ status: 400, message:`reservation_date Must be A Valid Date`})}

}

function validateTime(req,res, next) {
  const { data = {}} = req.body

  if (moment(data["reservation_time"], 'HH:mm', true).isValid()) {return next()} else { return next({status: 400, message: "reservation_time must be a valid time"})}

}

function validatePeople(req, res, next) {
  const { data = {}} = req.body
  const check = typeof data["people"];

  if(check !== "number") {return next({status: 400, message: "people must be a valid number"})}
 

  next()
}

async function create(req, res) {
 

  const data = await service.post(req.body.data)
  res.status(201).json({ data })
}

module.exports = {
  list,
  create: [
            hasValidBody("first_name"),
            empty("first_name"),
            hasValidBody("last_name"),
            empty("last_name"),
            hasValidBody("mobile_number"),
            empty("mobile_number"),
            hasValidBody("reservation_date"),
            validateDateIsPresent,
            validateBussinessIsOpen,
            validateOpenTime,
            empty("reservation_date"),
            hasValidBody("reservation_time"),
            empty("reservation_time"),
            hasValidBody("people"),
            empty("people"),
            validateDate,
            validateTime,
            validatePeople,
           create]
};
