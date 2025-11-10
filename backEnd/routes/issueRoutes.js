import express from "express";
import { createIssue, getIssues, updateIssueStatus } from "../controllers/issueController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("image"), createIssue);
router.post("/", createIssue);
router.get("/", getIssues);
router.put("/:id/status", updateIssueStatus);

export default router;
