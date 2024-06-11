import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import numbersService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    numbersService.getPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const foundPerson = persons.find((person) => person.name === newName);
        numbersService
          .updatePerson(foundPerson, newNumber)
          .then((updatedPerson) => {
            const updatedPersons = persons.map((person) =>
              person.id !== foundPerson.id
                ? person
                : { ...updatedPerson, number: newNumber }
            );

            setPersons(updatedPersons);
            setNotificationMessage({
              message: `Updated contact for ${foundPerson.name}`,
              error: false,
            });

            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);

            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage({
              message: error.response.data.error,
              error: true,
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);

            console.error("Error updating person:", error);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };

      numbersService
        .setPerson(personObject)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNotificationMessage({
            message: `Added contact for ${personObject.name}`,
            error: false,
          });

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);

          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error adding person:", error);
          setNotificationMessage({
            message: error.response.data.error,
            error: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
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

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete contact for ${personToDelete.name}?`)) {
      numbersService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationMessage({
            message: `Deleted contact for ${personToDelete.name}`,
            error: false,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
          setNotificationMessage({
            message: `Error deleting contact for ${personToDelete.name}`,
            error: true,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notificationMessage={notificationMessage} />
      <Filter handleFilter={handleFilterChange} />
      <h3>Add a new contact</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
