'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Axios from "axios";
import WhyCard from "../components/WhyCard";
import { whyData } from "../data/Data";

const Api = () => {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  const fetchWeather = async (city: string) => {
    try {
      const response = await Axios.get(`/api/weather?city=${city}`);
      setData(response.data);
      setError(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchWeather('ottawa');
  }, []);

  const searchLocation = (e: any) => {
    if (e.key === "Enter") {
      fetchWeather(location);
    }
  };

  return (
    <div className="api-external relative">
      {data.weather && (
        <Image
          className="absolute w-[28em] top-[-14em] left-[calc(100vw-100%)] z-10 animate-weather-appear md-custom:w-[30em] md-custom:left-[calc(100vw-80%)] lg-custom:left-[calc(100vw-47%)] lg-custom:top-[-14em]"
          src={require(`../assets/images/${data.weather[0].icon}.png`)}
          alt="weather condition"
          width={450}
          height={450}
        />
      )}
      <section className="section bg-bright text-dark py-32 pb-40 w-full [clip-path:polygon(0_0,100%_0,100%_calc(100%-10vw),0_100%)] md-custom:py-48 md-custom:pb-56 lg-custom:py-56 lg-custom:pb-44" id="api">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 grid-rows-[repeat(12,auto)] w-[90%] mx-auto mb-12 md-custom:w-[60%] lg-custom:grid-cols-8 lg-custom:grid-rows-[auto_auto_4em_repeat(6,auto)] lg-custom:w-[65%]">
            <div className="col-span-4 row-span-1 row-start-2 flex flex-col leading-[3rem] font-main-semibold text-[2.8rem] lg-custom:w-[18em]">
              <h2>What city</h2>
              <h2>are you in?</h2>
              <input
                className="h-[3em] w-full mt-[0.7em] lg-custom:w-[18em] text-dark p-4 border border-dark/20"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={searchLocation}
                placeholder="enter location"
                type="text"
              />
            </div>
            
            <p className={`col-span-4 row-start-3 mb-[4.8em] font-main-regular text-[0.9rem] w-[20em] text-bright bg-third p-2 text-center animate-appear z-[-10] lg-custom:col-span-3 lg-custom:mb-8 ${error ? "block" : "hidden"}`}>
              ...Ops, city not found. Try again! :)
            </p>
            
            <h4 className="col-span-4 row-start-3 mt-20 font-main-regular lg-custom:col-span-1 lg-custom:row-start-5 lg-custom:mt-0">Weather in</h4>
            <h3 className="col-span-4 row-start-4 text-[3rem] font-main-semibold uppercase leading-[3.5rem] lg-custom:row-start-6 lg-custom:text-[4rem] lg-custom:leading-[4.5rem]">{data.name}</h3>
            {data.sys ? (
              <h3 className="col-span-3 row-start-5 text-[2rem] font-main-semibold uppercase leading-[3.5rem] lg-custom:row-start-7 lg-custom:text-[3rem] lg-custom:leading-[4.5rem]">{data.sys.country}</h3>
            ) : null}

            <h4 className="col-span-1 row-start-6 mt-20 font-main-regular text-[0.8rem] inline-block lg-custom:row-start-8 lg-custom:mt-8">
              Longitude {data.coord ? <p className="font-main-semibold text-[1.5rem] inline">{data.coord.lon}</p> : null}
            </h4>
            <h4 className="col-start-2 col-span-1 row-start-6 mt-20 font-main-regular text-[0.8rem] inline-block lg-custom:row-start-8 lg-custom:mt-8">
              Latitude {data.coord ? <p className="font-main-semibold text-[1.5rem] inline">{data.coord.lat}</p> : null}
            </h4>
            
            <h3 className="col-span-4 row-start-1 font-main-semibold text-[1.8rem] capitalize text-center mb-[3.5em] lg-custom:col-span-8 lg-custom:text-right lg-custom:mb-[1.5em] lg-custom:text-[2.25rem]">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </h3>

            <div className="hidden flex-col text-right p-2 ml-4 lg-custom:flex lg-custom:col-start-6 lg-custom:row-start-2 lg-custom:text-right">
              <h4 className="font-main-regular">Feels like</h4>
              <h3>
                {data.main ? (
                  <p className="font-main-semibold text-[1.5rem]">
                    {Math.trunc(data.main.feels_like)}
                  </p>
                ) : null}
              </h3>
            </div>
            <h5 className="hidden lg-custom:block lg-custom:col-start-7 lg-custom:row-start-2 font-main-semibold text-[0.8rem] mt-12">°C</h5>

            <div className="col-span-4 row-start-8 flex flex-col text-right p-2 ml-4 lg-custom:col-span-2 lg-custom:col-start-7 lg-custom:row-start-2">
              <h4 className="font-main-regular">Current weather</h4>
              <h3>
                {data.main ? (
                  <p className="font-main-semibold text-5xl mb-[-0.5rem] md-custom:text-[5rem]">{Math.trunc(data.main.temp)}°C</p>
                ) : null}
              </h3>
            </div>

            <div className="col-span-1 col-start-2 row-start-9 mt-12 flex flex-col text-right p-2 ml-4 lg-custom:col-start-7 lg-custom:row-start-4 lg-custom:mt-0">
              <h4 className="font-main-regular">Wind</h4>
              <h3>
                {data.wind ? <p className="font-main-semibold text-[1.5rem]">{data.wind.speed}</p> : null}
              </h3>
              <h5 className="font-main-light text-[0.8rem]">km/h</h5>
            </div>

            <div className="col-span-1 col-start-2 row-start-10 mt-4 flex flex-col text-right p-2 ml-4 lg-custom:col-start-7 lg-custom:row-start-5 lg-custom:mt-0">
              <h4 className="font-main-regular">Pressure</h4>
              <h3>
                {data.main ? (
                  <p className="font-main-semibold text-[1.5rem]">{data.main.pressure}</p>
                ) : null}
              </h3>
              <h5 className="font-main-light text-[0.8rem]">kPa</h5>
            </div>

            <div className="col-span-2 col-start-3 row-start-9 mt-12 flex flex-col text-right p-2 ml-4 lg-custom:col-span-1 lg-custom:col-start-8 lg-custom:row-start-4 lg-custom:mt-0">
              <h4 className="font-main-regular">Humidity</h4>
              <h3>
                {data.main ? (
                  <p className="font-main-semibold text-[1.5rem]">{data.main.humidity}</p>
                ) : null}
              </h3>
              <h5 className="font-main-light text-[0.8rem]">%</h5>
            </div>

            <div className="col-span-2 col-start-3 row-start-10 mt-4 flex flex-col text-right p-2 ml-4 lg-custom:col-span-1 lg-custom:col-start-8 lg-custom:row-start-5 lg-custom:mt-0">
              <h4 className="font-main-regular">Visibility</h4>
              <p className="font-main-semibold text-[1.5rem]">{data.visibility}</p>
              <h5 className="font-main-light text-[0.8rem]">km</h5>
            </div>

            <div className="col-span-2 col-start-3 row-start-11 mt-8 text-right lg-custom:col-span-2 lg-custom:col-start-7 lg-custom:row-start-7 lg-custom:mt-0">
              <h4 className="font-main-light text-[0.8rem]">Updated on</h4>
              <h3 className="font-main-light text-[0.8rem]">
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
