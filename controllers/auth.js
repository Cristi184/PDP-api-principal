const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const {createError} = require("../utils/error.js");
const jwt = require('jsonwebtoken');
const Sections = require("../models/Sections.js");


const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User.UserSchema({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).json("User has been created.")
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.UserSchema.findOne({username: req.body.username})
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))
        const {password, isAdmin, ...otherDetails} = user._doc

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({...otherDetails})
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.UserSchema.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        await User.UserSchema.findByIdAndDelete(req.params.id)
        res.status(200).json(`${req.params.id} was deleted`)
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const getUser = await User.UserSchema.findById(req.params.id,)
        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const getUsers = await Sections.SectionsSchema.find()
        res.status(200).json(getUsers)
    } catch (err) {
        next(err)
    }
}

module.exports = {getUsers, getUser, deleteUser, updateUser, login, register}