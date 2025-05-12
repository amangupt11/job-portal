import express from "express";
import multer from "multer";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";
import isAuthenticated from "../midddlewares/isAuthenticated.js";

const router = express.Router();
const upload = multer();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
// router.route("/update/:id").put(isAuthenticated,updateJob);
router.route("/update/:id").put(isAuthenticated, upload.none(), updateJob);


export default router;