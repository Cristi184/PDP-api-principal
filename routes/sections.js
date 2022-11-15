const express = require("express");
const {
    createSection,
    deleteSection,
    getSection,
    getSectionByNameByLanguage,
    getSections,
    getSectionsByLanguage,
    updateSection
} = require("../controllers/sections.js");
const {verifyToken} = require("../utils/verifyToken.js");

const router = express.Router();

//Create
router.post("/", verifyToken, createSection)

//Update
router.put("/:id", updateSection)

//Delete
router.delete("/:id", deleteSection)

//Get
router.get("/find/:id", getSection)

//Get All
router.get("/", getSections)

router.get("/sectionByLanguage", getSectionsByLanguage)

router.get("/getSectionByNameByLanguage", getSectionByNameByLanguage)


module.exports = router