import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

export default function App(props) {
  const [countriesArr, setCountriesArr] = useState([]);

  // function to get countries array from API and store it in the countriesArr var
  const getCountriesData = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountriesArr(data);
      // console.log(
      //   countriesArr.filter((country) => country.name.common.includes("India"))
      // );
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  // useEffect to get the countries array data at the component mounting phase
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
    if (e.target.value === "") {
      getCountriesData();
    }
    let filteredCountryList = countriesArr.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountriesArr(filteredCountryList);
  };

  return (
    <>
      <div className="inputContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for countries"
          onChange={inputChangeHandler}
        ></input>
      </div>
      <div style={containerStyle}>
        {countriesArr?.map((country) => {
          return (
            <div className="countryCard" key={country.cca3} style={cardStyle}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={imageStyle}
              />
              <h2>{country.name.common}</h2>
            </div>
          );
        })}
        {}
      </div>
    </>
  );
}
