const db = require("../models/DataBase");

// Afficher tout les paper //
exports.getAllPapers = (req, res, next) => {
  db.query(
    "SELECT p.*, u.username FROM groupomania.papers p INNER JOIN groupomania.users u  ON u.id = p.owner_id ORDER BY p.createdAt DESC",
    (error, results) => {
      if (error) {
        return res.status(400).json({ error });
      }

      return res.status(200).json(results);
    }
  );
};
// Créer un paper //
exports.newPaper = (req, res, next) => {
  const imgUrl =
    "file" in req
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null;
  db.query(
    `INSERT INTO groupomania.papers (content, img, createdAt, owner_id) VALUES ( ?, ?, NOW(), ?)`,
    [req.body.content, imgUrl, req.body.userID],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(201).json({
        message: "Votre paper à été publié !",
      });
    }
  );
};
// Afficher un paper //
exports.getOnePaper = (req, res, next) => {
  db.query(
    "SELECT p.*, u.username FROM groupomania.papers p inner join groupomania.users u on u.id = p.owner_id WHERE p.id = ?",
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
};
// Effacer un paper//
exports.deleteOnePaper = (req, res, next) => {
  db.query(
    "DELETE FROM groupomania.papers WHERE paper.id = ?",
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
// Modifier le paper utilisateur //
exports.modifyOnePaper = (req, res, next) => {
  db.query(
    `UPDATE groupomania.papers SET content = ? WHERE paper.id = ?`,
    [req.body.content],
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};
// Afficher les papers d'un utilisateur //
exports.getUserPapers = (req, res, next) => {
  db.query(
    `SELECT * FROM groupomania.papers WHERE paper.userID = ?`,
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
};
