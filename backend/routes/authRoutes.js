const express = require("express");
const { register, login } = require("../controllers/authController");
const { postJob, getJob } = require("../controllers/jobController")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/postjob", postJob);
router.get("/getjob", getJob);  


module.exports = router;

