import React from "react";
import { useEffect, useState } from "react";

export function App(props) {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState("");
  const getCountriesData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      console.log(data);
      setCountries(data);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };
  useEffect(() => {
    getCountriesData();
  }, []);

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const inputChangeHandler = (e) => {
    // console.log(e.target.value);
    console.log(
      countries.filter((country) => country.includes(e.target.value))
    );
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Search for countries"
        onChange={inputChangeHandler}
      ></input>
      <br />
      <p>{searchedCountry}</p>
      {countries.map((country) => {
        return (
          <div key={country.cca3} style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <h2>{country.name.common}</h2>
          </div>
        );
      })}
    </div>
  );
}
