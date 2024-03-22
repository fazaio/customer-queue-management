const router = require("express").Router();
const visitor = require("../controllers/visitor.controller");

// router.get("/tes", visitor.TEST);
router.get("/all", visitor.READS_VISITORS);
router.get("/queue", visitor.QUEUE_VISITORS);
router.post("/create", visitor.CREATES_VISITORS);

module.exports = router;