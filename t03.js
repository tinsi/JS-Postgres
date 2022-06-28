const { Pool } = require("pg");

const pool = new Pool();
(async () => {
  // note: we don't try/catch this because if connecting throws an exception
  // we don't need to dispose of the client (it will be undefined)
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "INSERT INTO person (name) VALUES ($1);";
    const res = await client.query(queryText, ["Pertti"]);
    const insertCert = "INSERT INTO certificates (name) VALUES ($1)";
    const insertPhotoValues = [res.rows[0].id, "s3.bucket.foo"];
    await client.query(insertCert, insertPhotoValues);
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
})().catch((e) => console.error(e.stack));
