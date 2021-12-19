const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCommentCtrl = require("../controllers/comment");

router.get("/:id",auth , userCommentCtrl.getAllComments);
router.post("/:id",auth , userCommentCtrl.newComment);
router.delete("/:id",auth, userCommentCtrl.deleteComment);

module.exports = router;
