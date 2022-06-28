import "dotenv/config";
import pkg, { Pool } from "pg";

const { Client } = pkg;

//await connectDB();

//

async function connectDB() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });
  await client.connect();
  const res = await client.query("SELECT * FROM person");
  res.rows.forEach((person) => console.log(person));
  await client.end();
}
export default connectDB;

// tulostaa pelkät sarakkeiden nimet:
//SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name   = 'person';

// inserttaa uuden rivin:
// INSERT INTO person (name, age) VALUES ('Jussi', '30');
