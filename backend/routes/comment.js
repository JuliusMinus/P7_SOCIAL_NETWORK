const express = require("express");
const router = express.Router();

const userCommentCtrl = require("../controllers/comment");

router.get("/:id", userCommentCtrl.getAllComments);
router.post("/:id", userCommentCtrl.newComment);
router.delete("/comment/:id", userCommentCtrl.deleteComment);

module.exports = router;
