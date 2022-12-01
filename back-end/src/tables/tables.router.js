const router = require("express").Router();
const controller = require("./tables.controller")



router.route("/:table_id/seat").put(controller.put)
router.route("/").get(controller.list).post(controller.post)

module.exports = router