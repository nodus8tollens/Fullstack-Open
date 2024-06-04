import axios from "axios";

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

export { getCountry };
