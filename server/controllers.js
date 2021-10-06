import pool from "./db.js";

export const getUrlById = (req, res) => {
  pool
    .query("SELECT short_url, original_url FROM urls WHERE short_url = $1", [
      req.params.id,
    ])
    .then(data => res.redirect(data.rows[0].original_url))
    .catch(err => console.log(err));
};

export const getUrl = (req, res, next) => {
  pool
    .query("SELECT short_url, original_url FROM urls WHERE original_url = $1", [
      req.body.url,
    ])
    .then(data => {
      if (data.rowCount === 0) {
        next();
      }
      if (data.rowCount > 0) {
        res.json(data.rows[0]);
      }
    })
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

export const addUrl = (req, res) => {
  const { url } = req.body;

  pool
    .query("INSERT INTO urls(original_url) VALUES ($1) RETURNING *", [url])
    .then(data => {
      res.json(data.rows[0]);
    })
    .catch(err => {
      console.log(err);
    });
};
