import axios from "axios";

const baseUrl = "api/persons";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const updatePerson = (foundPerson, newNumber) => {
  const request = axios.put(`${baseUrl}/${foundPerson.id}`, {
    ...foundPerson,
    number: newNumber,
  });

  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const deleteUrl = `${baseUrl}/${id}`;
  const request = axios.delete(deleteUrl);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error in deletePerson:", error);
      throw error;
    });
};

export default { baseUrl, getPersons, setPerson, updatePerson, deletePerson };
