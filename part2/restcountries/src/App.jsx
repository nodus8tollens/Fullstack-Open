/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

import Search from "./components/Search";

const allCountriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountry = (searchString) => {
  return axios
    .get(allCountriesURL)
    .then((response) => {
      const countries = response.data;
      const filteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(searchString.toLowerCase());
      });
      return filteredCountries;
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });
};

getCountry("ab")
  .then((filteredCountries) => {
    console.log(filteredCountries);
  })
  .catch((error) => {
    console.error(error);
  });

function App() {
  const [searchString, setSearchString] = useState(null);
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
    console.log(searchString);
    getCountry();
  };

  return (
    <>
      <h1>Rest Countries</h1>
      <Search handleSearchChange={handleSearchChange} />
    </>
  );
}

export default App;
