import express from "express";
import {
    createSection,
    deleteSection,
    getSection,
    getSectionByNameByLanguage,
    getSections,
    getSectionsByLanguage,
    updateSection
} from "../controllers/sections.js";
import {verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, createSection)

//Update
router.put("/:id", verifyToken, updateSection)

//Delete
router.delete("/:id", verifyToken, deleteSection)

//Get
router.get("/find/:id", getSection)

//Get All
router.get("/", getSections)

router.get("/sectionByLanguage", getSectionsByLanguage)

router.get("/getSectionByNameByLanguage", getSectionByNameByLanguage)

export default router