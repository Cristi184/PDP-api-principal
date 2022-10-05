import express from "express";
import {
    createSection,
    deleteSection,
    getSection,
    getSectionByName,
    getSections, getSectionsByLanguage,
    updateSection
} from "../controllers/sections.js";
import {verifyAdmin, verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, createSection)

//Update
router.put("/:id", verifyToken, updateSection)

//Delete
router.delete("/find/:id", verifyToken, deleteSection)

//Get
router.get("/find/:id", getSection)

//Get All
router.get("/", getSections)

router.get("/sectionLanguage", getSectionsByLanguage)


router.get("/getBySectionName", getSectionByName)

export default router