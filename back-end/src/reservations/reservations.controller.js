const service = require("./reservations.service")
const moment = require("moment")



/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const date = req.query.date
  
  
  const data = await service.list(date)
  res.json({data});
}

//adding properties validater

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

  if(isNaN(data["people"])) {return next({status: 400, message: "people must be a valid number"})}
 

  next()
}

async function create(req, res) {
 const reservation = {
  ...req.body.data,
  "people": parseInt(req.body.data["people"])
 }

  const data = await service.post(reservation)
  res.status(201).json({ data })
}

module.exports = {
  list,
  create: [hasValidProperties,
            hasValidBody("first_name"),
            empty("first_name"),
            hasValidBody("last_name"),
            empty("last_name"),
            hasValidBody("mobile_number"),
            empty("mobile_number"),
            hasValidBody("reservation_date"),
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
