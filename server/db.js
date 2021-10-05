import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "postgres",
  database: "url_shortener",
  host: "localhost",
  port: 5432,
});

export default pool;
