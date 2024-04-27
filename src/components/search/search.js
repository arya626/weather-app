import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.region}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    console.log(searchData);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "None",
      color: "#ff",
      boxShadow: state.isFocused ? "0 0 0 1px #EDC7B7" : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#EDC7B7" : null,
      color: state.isFocused ? "white" : null,
    }),
  };

  return (
    <div className={"search-container"}>
      <AsyncPaginate
        placeholder="Search for a city or place"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default Search;
