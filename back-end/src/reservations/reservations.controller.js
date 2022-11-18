const service = require("./reservations.service")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  
  const data = await service.list()
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

  const invalidFields = Object.keys(req.body).filter(
    (field) => { !valid_properties.includes(field)})

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(" ,")}`
    })
  }  
  next()
}


async function create(req, res) {
  const data = await service.post(req.body)
  res.status(201).json({ data })
}

module.exports = {
  list,
  create: [hasValidProperties, create]
};
