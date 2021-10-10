import { validationResult } from "express-validator";
import pool from "./db.js";

export const getUrlById = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  pool
    .query("SELECT short_url, original_url FROM urls WHERE short_url = $1", [
      req.params.id,
    ])
    .then(data => {
      if (data.rowCount === 0) {
        return res.status(404).json({
          error: "No short URL found for the given input",
        });
      }
      if (data.rowCount > 0) {
        return res.redirect(data.rows[0].original_url);
      }
    })
    .catch(err => console.log(err));
};

export const getUrlByUrl = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      // param: errors.array()[0].param,
    });
  }

  pool
    .query("SELECT short_url, original_url FROM urls WHERE original_url = $1", [
      req.body.url,
    ])
    .then(data => {
      if (data.rowCount === 0) {
        return next();
      }
      if (data.rowCount > 0) {
        return res.json(data.rows[0]);
      }
    })
    .catch(err => console.log(err));
};

export const addUrl = (req, res) => {
  pool
    .query("INSERT INTO urls(original_url) VALUES ($1) RETURNING *", [
      req.body.url,
    ])
    .then(data => res.status(201).json(data.rows[0]))
    .catch(err => console.log(err));
};

// export const duplicateKeyErrorHandler = (err, req, res, next) => {
//   if (err.code == "23505") {
//     pool
//       .query(
//         "SELECT short_url, original_url FROM urls WHERE original_url = $1",
//         [req.body.url]
//       )
//       .then(data => res.json(data.rows[0]))
//       .catch(err => console.log(err));
//   }
// };
