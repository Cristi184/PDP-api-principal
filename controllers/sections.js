import Sections from "../models/Sections.js";

export const createSection = async (req, res, next) => {
    const newSections = new Sections(req.body)
    try {
        const savedSections = await newSections.save()
        res.status(200).json(savedSections)
    } catch (err) {
        next(err)
    }
}
export const updateSection = async (req, res, next) => {
    try {
        const updatedSections = await Sections.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedSections)
    } catch (err) {
        next(err)
    }
}
export const deleteSection = async (req, res, next) => {
    try {
        await Sections.findByIdAndDelete(req.params.id)
        res.status(200).json(`${req.params.id} was deleted`)
    } catch (err) {
        next(err)
    }
}

export const getSection = async (req, res, next) => {
    try {
        const getSection = await Sections.findById(req.params.id,)
        res.status(200).json(getSection)
    } catch (err) {
        next(err)
    }
}

export const getSectionByNameByLanguage = async (req, res, next) => {
    const name = req.query.name
    const lang = req.query.language
    let getSection
    try {
        if (name) {
            getSection = await Sections.find({sectionName: name})
        } else
            getSection = await Sections.find({sectionName: name, language: lang})
        res.status(200).json(getSection)
    } catch
        (err) {
        next(err)
    }
}


export const getSections = async (req, res, next) => {
    try {
        const getSections = await Sections.find()
        res.status(200).json(getSections)
    } catch (err) {
        next(err)
    }
}
export const getSectionsByLanguage = async (req, res, next) => {
    const languageSection = req.query.language
    try {
        const getSections = await Sections.find({language: languageSection})
        res.status(200).json(getSections)
    } catch (err) {
        next(err)
    }
}