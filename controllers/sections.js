const Sections = require("../models/Sections.js");

const createSection = async (req, res, next) => {
    const newSections = new Sections.SectionsSchema(req.body)
    try {
        const savedSections = await newSections.save()
        res.status(200).json(savedSections)
    } catch (err) {
        next(err)
    }
}
const updateSection = async (req, res, next) => {
    try {
        const updatedSections = await Sections.SectionsSchema.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedSections)
    } catch (err) {
        next(err)
    }
}
const deleteSection = async (req, res, next) => {
    try {
        await Sections.SectionsSchema.findByIdAndDelete(req.params.id)
        res.status(200).json(`${req.params.id} was deleted`)
    } catch (err) {
        next(err)
    }
}

const getSection = async (req, res, next) => {
    try {
        const getSection = await Sections.SectionsSchema.findById(req.params.id,)
        res.status(200).json(getSection)
    } catch (err) {
        next(err)
    }
}

const getSectionByNameByLanguage = async (req, res, next) => {
    const name = req.query.name
    const lang = req.query.language
    let getSection
    try {
        if (name) {
            getSection = await Sections.SectionsSchema.find({sectionName: name})
        } else
            getSection = await Sections.SectionsSchema.find({sectionName: name, language: lang})
        res.status(200).json(getSection)
    } catch
        (err) {
        next(err)
    }
}


const getSections = async (req, res, next) => {
    try {
        const getSections = await Sections.SectionsSchema.find()
        res.status(200).json(getSections)
    } catch (err) {
        next(err)
    }
}
const getSectionsByLanguage = async (req, res, next) => {
    const languageSection = req.query.language
    try {
        const getSections = await Sections.SectionsSchema.find({language: languageSection})
        res.status(200).json(getSections)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getSectionsByLanguage,
    getSections,
    getSectionByNameByLanguage,
    getSection,
    deleteSection,
    updateSection,
    createSection
}