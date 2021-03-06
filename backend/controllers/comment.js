const db = require("../models/DataBase.js");

// Créer des nouveaux commentaires //
exports.newComment = (req, res, next) => {
  var queryParams = [req.body.content, req.body.userId, req.params.id];
  
  db.query(
    `INSERT INTO groupomania.comments(text, createdAt, owner_id, paper_id) VALUES (?, NOW(), ?, ?)`,
    queryParams,
    (error, result, field) => {
      if (error) {
       
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};

// Affichage des com//
exports.getAllComments = (req, res, next) => {
  db.query(
    `SELECT c.*, u.username FROM groupomania.users u INNER JOIN groupomania.comments c ON c.owner_id = u.id and c.paper_id = ? ORDER BY c.createdAt DESC`,
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
// Suppression des com //
exports.deleteComment = (req, res, next) => {
  db.query(
    `DELETE FROM groupomania.comments WHERE id = ?`,
    [req.params.id],
    (error, result, field) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
