import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const res = await client.query("SELECT * FROM betta");

const bettas = res.rows;

console.log({ bettas });

await client.end();
