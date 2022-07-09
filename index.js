import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

await connectDB();

//

async function connectDB() {
  const pool = new Pool({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });
  await pool.connect();
  const res = await pool.query("SELECT * FROM person");
  res.rows.forEach((person) => console.log(person));
  await pool.end();
}
export default connectDB;

// tulostaa pelkät sarakkeiden nimet:
//SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name   = 'person';

// inserttaa uuden rivin:
// INSERT INTO person (name, age) VALUES ('Jussi', '30');
