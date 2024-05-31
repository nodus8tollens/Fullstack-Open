import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const addNumber = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
    }

    console.log("submit");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        {persons.map((person) => {
          return <p key={person.id}>{person.name}</p>;
        })}
      </div>
      ...
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
