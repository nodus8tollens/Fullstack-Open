import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }

    console.log("submit");
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const filterPersons = (filter) => {
    if (!filter) return persons;
    const capitalizedFilter = capitalizeFirstLetter(filter);
    return persons.filter((person) =>
      person.name.toLowerCase().startsWith(capitalizedFilter.toLowerCase())
    );
  };

  const personsToShow = filter ? filterPersons(filter) : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilter} />
      <h3>Add a new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
      ...
    </div>
  );
};

export default App;
