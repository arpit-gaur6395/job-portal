import express from "express";
import {
  getJob,
  postJob,
  applyJob,
  deleteJob,
  updateJob,
  getApplicantsByJob,
  deleteApplicant
} from "../controllers/jobController.js";

import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/getjob", getJob);
router.post("/postjob", postJob);
router.delete("/:id", deleteJob);
router.put("/:id", updateJob);

router.post("/apply/:jobId", upload.fields([{ name: "resume" }, { name: "photo" }]), applyJob);

router.get("/applicants/:jobId", getApplicantsByJob);

router.delete("/applicant/:id", deleteApplicant);

export default router;
