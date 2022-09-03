const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const { handleRegister } =require("./controllers/register");
const { handleSignIn } = require("./controllers/signin");
const { handleProfile } = require("./controllers/profile");
const { handleImage, handleApiCall } = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  },
});

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send('success') });

app.post("/signin", handleSignIn(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:id", handleProfile(db));

app.put("/image", handleImage(db));

app.post("/imageurl", (req, res) => { handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
