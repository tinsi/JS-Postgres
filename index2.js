import "dotenv/config";
import pkg from "pg";

//alla olevassa on käytetty try-catchiä, jotta käyttäjälle ilmoitetaan, jos tulee virhe

async function selectPersons(client) {
  try {
    const res = await client.query("SELECT * FROM person");
    console.table(res.rows);
  } catch (err) {
    console.log(err);
  }
}

async function selectCerts(client) {
  const res = await client.query("SELECT * FROM certificates");
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function printColumns(client) {
  const res = await client.query(
    "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name   = 'person'"
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function insertInto(client) {
  const res = await client.query(
    "INSERT INTO person (name, age) VALUES ('Jussi', '30');"
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function certOwners(client) {
  const res = await client.query(
    "SELECT person.name AS nimi, certificates.name AS sertifikaatti FROM person, certificates WHERE person.id = certificates.person_id;"
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function scrumOwners(client) {
  const res = await client.query(
    "SELECT person.name AS scrumin_suorittaneet FROM person, certificates WHERE certificates.name = 'Scrum' AND person.id = certificates.person_id;"
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function insertAsParam(client, name, age) {
  const res = await client.query(
    `INSERT INTO person (name, age) VALUES ('${name}', ${age})`
  );
  //res.rows.forEach((person) => console.log(person));
  await client.end();
}

//---------------------------------------------------------------------------------------------------------------------

const text = "INSERT INTO person (name, age) VALUES ($1, $2)";
const values = ["Saaga", 27];

async function insertAsParameterized(client, text, values) {
  const res = await client.query(text, values);
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

//---------------------------------------------------------------------------------------------------------------------

async function updatePersonName(client, name, id) {
  const res = await client.query(
    `UPDATE person SET name = '${name}' WHERE id = '${id}';`
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function updateCert(client, name, id) {
  const res = await client.query(
    `UPDATE certificates SET name = '${name}' WHERE person_id = '${id}';`
  );
  res.rows.forEach((certificates) => console.log(certificates));
  await client.end();
}

async function deleteIdFromPerson(client, id) {
  const res = await client.query(`DELETE FROM person WHERE id = '${id}';`);
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

async function deleteIdFromCertificates(client, id) {
  const res = await client.query(
    `DELETE FROM certificates WHERE id = '${id}';`
  );
  res.rows.forEach((person) => console.log(person));
  await client.end();
}

//---------------------------------------------------------------------------------------------------------------------
// alempana ota pois kommentointi siitä funktiosta, jota haluat käyttää

const { Client } = pkg;

await connectDB();

async function connectDB() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTIONSTRING,
  });
  await client.connect();

  //await printColumns(client);
  //await insertInto(client);
  //await scrumOwners(client);
  //await certOwners(client);
  //await insertAsParam(client, "Enni", 24);
  //await insertAsParameterized(client, text, values);
  //await updatePersonName(client, "Hilma", 5);
  //await updateCert(client, "GCP", 2);
  //await deleteIdFromPerson(client, 11);
  //await deleteIdFromCertificates(client, 4);

  await selectPersons(client);
  //await selectCerts(client);

  await client.end();
}
export default connectDB;
