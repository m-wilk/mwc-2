import React from "react";
import "./WidgetWather.scss";
import { useEffect, useState } from "react";

function WidgetWather() {
  const [wetherData, setWatherData] = useState();

  const [cityName, setCityName] = useState();

  useEffect(() => {
    if (cityName) {
      const getWetherData = async () => {
        // const catcheData = JSON.parse(sessionStorage.getItem("dateWather"));
        // if (catcheData && catcheData[cityName]) {
        //   setWatherData(catcheData[cityName]);
        //   return
        // }
        try {
          const res = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=951d00775bb5436eb7981240232812&q=${cityName}&aqi=no`
          );
          const data = await res.json()
          setWatherData(data);
          // sessionStorage.setItem("dateWather", JSON.stringify({ ...catcheData, ...{ [cityName]: data } }));
        } catch (error) {
          console.log(error);
        }
      };
      getWetherData();
    }
  }, [cityName]);
  console.log(cityName);

  return (
    <div className="bg-secondary wetherWidget">
      <select
        onChange={(e) => {
          setCityName(e.target.value);
        }}
        className="form-select form-select-sm bg-light w-25 m-auto mb-3"
        aria-label="Default select example"
      >
        <option selected>Wybierz miasto</option>
        <option value="Warszawa">Warszawa</option>
        <option value="Krakow">Kraków</option>
        <option value="Wroclaw">Wrocław</option>
        <option value="Gdansk">Gdańsk</option>
      </select>
      {wetherData && (
        <div className="bg-white p-2">
          <img src={wetherData.current.condition.icon} alt="pogoda" />
          <p>{wetherData.current.last_updated}</p>
          <p>{wetherData.current.temp_c}</p>
          <p>{wetherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default WidgetWather;
