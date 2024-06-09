require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/person");

const PORT = process.env.PORT || 3001;

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  if (request.body.number === undefined) {
    return response.status(400).json({ error: "number missing" });
  }

  if (request.body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const { name, number } = request.body;
  const id = Number(request.params.id);
  Person.findByIdAndUpdate(id, { name, number })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => console.log("PUT Error: ", error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then((person) => {
    response.status(204).end();
  });
});

app.get("/info", (req, res) => {
  const reqTime = new Date();
  const formattedTime = reqTime.toString();
  const numOfPersons = persons.length;

  res.send(`
    <p>Phonebook has info for ${numOfPersons} people.</p>
    <br/>
    <p>${formattedTime}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
