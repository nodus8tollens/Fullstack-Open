require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/person");

const PORT = process.env.PORT || 3001;

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  next(error);
};

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, number })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  const reqTime = new Date();
  const formattedTime = reqTime.toString();

  Person.find({})
    .then((persons) => {
      const numOfPersons = persons.length;

      response.send(`
        <p>Phonebook has info for ${numOfPersons} people.</p>
        <br/>
        <p>${formattedTime}</p>
      `);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
