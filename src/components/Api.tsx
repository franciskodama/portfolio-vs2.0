'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";
import "../styles/Api.css";
import WhyCard from "../components/WhyCard";
import { whyData } from "../data/Data";

const Api = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}&units=metric`;

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY) {
      console.warn("OpenWeatherMap API key is missing. Weather data will not be fetched.");
      return;
    }
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=ottawa&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}&units=metric`
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const searchLocation = (e: any) => {
    if (e.key === "Enter") {
      setError(false);
      Axios.get(url)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          if (err.response) {
            setError(true);
          }
        });
    }
  };

  return (
    <div className="api-external">
      {data.weather && (
        <Image
          className="api-external__image"
          src={require(`../assets/images/${data.weather[0].icon}.png`)}
          alt="weather condition"
          width={450}
          height={450}
        />
      )}
      <section className="section api" id="api">
        <div className="container">
          <div className="api__grid">
            <div className="api__question">
              <h2>What city</h2>
              <h2>are you in?</h2>
              <input
                className="api__input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={searchLocation}
                placeholder="enter location"
                type="text"
              />
            </div>
            <p id="api__error" style={{ display: error ? "block" : "none" }}>
              ...Ops, city not found. Try again! :)
            </p>
            <h4 className="api__location-title">Weather in</h4>
            <h3 className="api__city">{data.name}</h3>
            {data.sys ? (
              <h3 className="api__country">{data.sys.country}</h3>
            ) : null}

            <h4 className="api__log">
              Longitude {data.coord ? <span>{data.coord.lon}</span> : null}
            </h4>
            <h4 className="api__lat">
              Latitude {data.coord ? <span>{data.coord.lat}</span> : null}
            </h4>
            {/* =============== SECOND SIDE =============== */}

            <h3 className="api__description">
              {data.weather ? <span>{data.weather[0].description}</span> : null}
            </h3>

            <div className="api__feels-wrapper">
              <h4 className="api__feels-title">Feels like</h4>
              <h3>
                {data.main ? (
                  <span className="data-feels">
                    {Math.trunc(data.main.feels_like)}
                  </span>
                ) : null}
              </h3>
            </div>
            <h5 className="api__feels-c">°C</h5>

            <div className="api__temp-wrapper">
              <h4 className="api__temp-title">Current weather</h4>
              <h3>
                {data.main ? (
                  <span className="api__temp">{Math.trunc(data.main.temp)}°C</span>
                ) : null}
              </h3>
            </div>
            <div className="api__wind-wrapper">
              <h4 className="api__others-title">Wind</h4>
              <h3>
                {data.wind ? <span className="data">{data.wind.speed}</span> : null}
              </h3>
              <h5 className="api__unit">km/h</h5>
            </div>

            <div className="api__pressure-wrapper">
              <h4 className="api__others-title">Pressure</h4>
              <h3>
                {data.main ? (
                  <span className="data">{data.main.pressure}</span>
                ) : null}
              </h3>
              <h5 className="api__unit">kPa</h5>
            </div>

            <div className="api__humidity-wrapper">
              <h4 className="api__others-title">Humidity</h4>
              <h3>
                {data.main ? (
                  <span className="data">{data.main.humidity}</span>
                ) : null}
              </h3>
              <h5 className="api__unit">%</h5>
            </div>

            <div className="api__visibility-wrapper">
              <h4 className="api__others-title">Visibility</h4>
              <p className="data">{data.visibility}</p>
              <h5 className="api__unit">km</h5>
            </div>

            <div className="api__sunrise-wrapper">
              <h4 className="api__others-title">Sunrise</h4>
              <h3>
                {data.sys ? (
                  <span className="data">
                    {new Date(data.sys.sunrise * 6000 - data.timezone * 1000)
                      .toString()
                      .slice(17, 21)}
                  </span>
                ) : null}
              </h3>
              <h5 className="api__unit">a.m.</h5>
            </div>

            <div className="api__sunset-wrapper">
              <h4 className="api__others-title">Sunset</h4>
              <h3>
                {data.sys ? (
                  <span className="data">
                    {new Date(data.sys.sunrise * 6000 - data.timezone * 1000)
                      .toString()
                      .slice(17, 21)}
                  </span>
                ) : null}
              </h3>
              <h5 className="api__unit">p.m.</h5>
            </div>

            <div className="api__updated-wrapper">
              <h4 className="api__date">Updated on</h4>
              <h3 className="api__date">
                {new Date(data.dt * 1000 - data.timezone * 6000)
                  .toString()
                  .slice(4)}
              </h3>
            </div>
          </div>
        </div>

        <WhyCard
          titleOne={whyData.api.titleOne}
          textOne={whyData.api.textOne}
          titleTwo={whyData.api.titleTwo}
          textTwo={whyData.api.textTwo}
          titleThree={whyData.api.titleThree}
          textThree={whyData.api.textThree}
          titleFour={whyData.api.titleFour}
          textFour={whyData.api.textFour}
          observation={whyData.api.observation}
          bottom={whyData.api.bottom}
          left={whyData.api.left}
        />
      </section>
    </div>
  );
};

export default Api;
