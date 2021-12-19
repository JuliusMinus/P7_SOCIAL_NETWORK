const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/DataBase.js");

const CONFIG = require("../config.js");

//Register//
exports.register = (req, res, next) => {
  db.query(
    `SELECT * FROM groupomania.users WHERE email = ?`,
    [req.body.email],
    (err, results) => {
      //On check le mail//
      if (results.length > 0) {
        res.status(403).json({
          message: "Email existe déjà.",
        });
        //Si l'email n'existe pas encore//
      } else {
        //Mot de passe bcrypt//

        bcrypt
          .hash(req.body.password, 10)
          .then((cryptedPassword) => {
            //Ajouts dans la base de données//
            db.query(
              `INSERT INTO groupomania.users (username,  email, password, createdAt ) VALUES (?, ?, ?, NOW())`,
              [req.body.username, req.body.email, cryptedPassword],
              (err, fields) => {
                if (err) {
                  return res.status(400).json(err);
                }

                return res.status(201).json({
                  message: "Votre compte a bien été crée !",
                });
              }
            );
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};

exports.login = (req, res, next) => {
  db.query(
    "SELECT * FROM groupomania.users WHERE email=?",
    [req.body.email],
    (err, results) => {
      if (results) {
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Mot de passe incorrect" });
            //On crée le token//
          } else {
            res.status(200).json({
              userId: results[0].id,
              email: results[0].email,
              username: results[0].username,
              token: jwt.sign({ userId: results[0].id }, CONFIG.JWT_SECRET, {
                expiresIn: "48h",
              }),
            });
          }
        });
      } else {
        res.status(404).json({ message: "Utilisateur inconnu" });
      }
    }
  );
};

exports.getUserProfile = (req, res, next) => {
  console.log("getUserProfile", req.params.id);

  db.query(
    "SELECT * FROM groupomania.users WHERE id=?",
    [req.params.id],
    (error, result, rows) => {
      console.log("error", error);
      console.log("result", result);
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(result);
    }
  );
};

exports.deleteUserProfile = (req, res, next) => {
  console.log("Delete", req);

  db.query(
    "DELETE FROM groupomania.users WHERE id=?",
    [req.params.id],
    (error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json({'status': 'ok'});
    }
  );
};
