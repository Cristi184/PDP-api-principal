import express from "express";
import {deleteUser, getUser, getUsers, updateUser} from "../controllers/auth.js";
import {verifyAdmin, verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in!")
})

//Update
router.put("/:id", verifyAdmin, updateUser)

//Delete
router.delete("/:id", verifyAdmin, deleteUser)

//Get
router.get("/:id", verifyAdmin, getUser)

//Get All
router.get("/", verifyAdmin, getUsers)

export default router