

//imports, db connection, and port#
const express = require("express");
const cors = require("cors");
const Pool = require("./db.js");
const app = express();
const PORT = 8080;

//middleware
app.use(cors());
app.use(express.json());

// columns in POSTGRES:
// table: pet
// id |   name   | owner |      breed       | age
// ----+----------+-------+------------------+-----
//   1 | Rex      | Dan   | Dachshund        |   4


//get request to an endpoint : get all animals
app.get("/api/v1/pets", async (req, res) => {
  const allPets = await Pool.query("SELECT * FROM pet");
  res.send(allPets.rows);
});

//get request using a query : get animal by owner
app.get("/api/v1/pets/owner", async (req, res) => {
  const owner = req.query.owner;
  const queryText = `SELECT * FROM pet WHERE owner ILIKE $1`;
  const data = await Pool.query(queryText, [owner]);
  if (data.rows) {
    res.send(data.rows);
  } else {
    res.send({ msg: "we have no owners by that name" });
  }
});

//get request using a parameter : get animal by name
app.get("/api/v1/pets/:name", async (req, res) => {
  let requestedPet = req.params.name;
  const queryText = `SELECT * FROM pet WHERE name ILIKE $1`;
  const data = await Pool.query(queryText, [requestedPet]);
  if (data.rows) {
    res.send(data.rows);
  } else {
    res.send({ msg: "we have no pets by that name" });
  }
});

//post request using endpoint : add an animal
app.post("/api/v1/pets/add", async (req, res) => {
  const { name, owner, breed, age } = req.body;
  const queryText =
    "INSERT INTO pet (name, owner, breed, age ) VALUES ($1, $2, $3, $4) RETURNING *";
  const data = await Pool.query(queryText, [name, owner, breed, age]);
  if (data.rows) {
    res.send(data.rows);
  } else {
    res.send({ msg: "error adding new pet" });
  }
});

//run the server on declared port
app.listen(PORT, () => {
  console.log("running on " + PORT);
});
