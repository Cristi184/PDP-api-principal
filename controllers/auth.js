import User from "../models/User.js";
import bcrypt from "bcrypt";
import {createError} from "../utils/error.js";
import jwt from 'jsonwebtoken'
import Sections from "../models/Sections.js";

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
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

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
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

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`${req.params.id} was deleted`)
    } catch (err) {
        next(err)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id,)
        res.status(200).json(getUser)
    } catch (err) {
        next(err)
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const getUsers = await Sections.find()
        res.status(200).json(getUsers)
    } catch (err) {
        next(err)
    }
}