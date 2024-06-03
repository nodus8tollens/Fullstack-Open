import axios from "axios";

const baseUrl = "http://localhost:3001/persons/";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

export default { getPersons, setPerson };
