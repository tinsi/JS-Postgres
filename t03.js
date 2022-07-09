import pkg from "pg";
import Pool from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_CONNECTIONSTRING,
});

//await pool.end();

(async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const res = await client.query(
      "INSERT INTO person (name, age) VALUES ('Minttu', '30');"
    );
    res.rows.forEach((person) => console.log(person));

    const res2 = await client.query(
      "INSERT INTO certificates (name, person_id) VALUES ('Enkelihoitaja', '16');"
    );
    res2.rows.forEach((person) => console.log(person));
    await client.end();

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
})().catch((e) => console.error(e.stack));
