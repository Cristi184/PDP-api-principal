
const express = require("express");
const {deleteUser, getUser, getUsers, updateUser} = require("../controllers/auth.js");
const {verifyAdmin, verifyToken} = require("../utils/verifyToken.js");
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

module.exports = router