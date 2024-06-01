"use client"
import React, { useState, KeyboardEvent } from 'react';
import styles from '../customlocation.module.css'

// Define types for state
interface Coordinates {
  lat: string;
  lon: string;
}

interface Parameters {
  o3: string;
  co: string;
  so2: string;
  n02: string;
  pm10: string;
  pm25: string;
  no: string;
  nh3: string;
}

interface UpdateTimes {
  o3: string;
  co: string;
  so2: string;
  n02: string;
  pm10: string;
  pm25: string;
  no: string;
  nh3: string;
}

const CustomLocation: React.FC = () => {
  const [location, setLocation] = useState<string>('Enter a Location');
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: 'TBD', lon: 'TBD' });
  const [temperature, setTemperature] = useState<string>('TBD');
  const [date, setDate] = useState<string>('Current Date');
  const [parameters, setParameters] = useState<Parameters>({
    o3: 'null',
    co: 'null',
    so2: 'null',
    n02: 'null',
    pm10: 'null',
    pm25: 'null',
    no: 'null',
    nh3: 'null'
  });
  const [lastUpdateTimes, setLastUpdateTimes] = useState<UpdateTimes>({
    o3: 'Last Update',
    co: 'Last Update',
    so2: 'Last Update',
    n02: 'Last Update',
    pm10: 'Last Update',
    pm25: 'Last Update',
    no: 'Last Update',
    nh3: 'Last Update'
  });
  const [aqi, setAqi] = useState<string>('Air Quality Index');

  const api = {
    key: "f6bf196015464b5fb8273e5522911cfc",
    base: "https://api.openweathermap.org/data/2.5/",
    base1: "https://api.openweathermap.org/data/2.5/"
  };

  const getResults = async (query: string) => {
    try {
      const weatherResponse = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
      const weatherData = await weatherResponse.json();
      displayWeatherResults(weatherData);

      const airPollutionResponse = await fetch(`${api.base1}air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=8774b26414ab041bce77e51bcf64f61f`);
      const airPollutionData = await airPollutionResponse.json();
      displayAirPollutionResults(airPollutionData);
    } catch (error) {
      alert('Error fetching data. Please try again.');
    }
  };

  const displayWeatherResults = (weatherData: any) => {
    setLocation(`${weatherData.name}, ${weatherData.sys.country}`);
    setCoordinates({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });
    setTemperature(`${weatherData.main.temp}°C`);
    setDate(getFormattedDate(new Date()));
  };

  const displayAirPollutionResults = (airPollutionData: any) => {
    const components = airPollutionData.list[0].components;
    setParameters({
      o3: `${components.o3} µg/m³`,
      co: `${components.co} µg/m³`,
      so2: `${components.so2} µg/m³`,
      n02: `${components.no2} µg/m³`,
      pm10: `${components.pm10} µg/m³`,
      pm25: `${components.pm2_5} µg/m³`,
      no: `${components.no} µg/m³`,
      nh3: `${components.nh3} µg/m³`
    });
    setLastUpdateTimes(getLastUpdateTimes());
    setAqi(`Air Quality Index: ${airPollutionData.list[0].main.aqi}`);
  };

  const getLastUpdateTimes = (): UpdateTimes => {
    const currentDate = getFormattedDate(new Date());
    return {
      o3: currentDate,
      co: currentDate,
      so2: currentDate,
      n02: currentDate,
      pm10: currentDate,
      pm25: currentDate,
      no: currentDate,
      nh3: currentDate
    };
  };

  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getResults(event.currentTarget.value);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`m-auto  max-w-screen-xl bg-white text-black styles['app-wrap']`}  >
         <nav className="bg-gradient-to-r p-5 mb-2 from-blue-500 to-indigo-600 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold hover:text-gray-300 transition-colors"
          >
            Environment Analyzer: Surrounding Assessment Tool
          </a>
          <div className="hidden md:flex space-x-6">
            <a
              href="/userlocation"
              className="hover:text-gray-50 hover:font-bold transition-colors  "
            >
              Home
            </a>
            <a
              href="/customlocation"
              className="hover:text-gray-50 hover:font-bold transition-colors"
            >
              Custom Location
            </a>
            <a
              href="#"
              className="hover:text-gray-50 hover:font-bold transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:text-gray-50 hover:font-bold transition-colors"
            >
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-blue-500">
            <a
              href="/userlocation"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/customlocation"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Custom Location
            </a>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>
        )}
      </nav>
      <header className='inputLocation m-auto p-4 bg-blue-500 text-white'>
        <h1 className="text-3xl text-center font-bold">Air Quality Index Tracker</h1>
        <input type="text" placeholder="Enter a Location..." className="search-box p-2 m-auto text-center rounded-md text-black mt-2" onKeyPress={handleKeyPress} />
      </header>
      <div className="location p-4">
        <div className="city text-xl">{location}</div>
        <div className="date">{date}</div>
      </div>
      <div className="coordinates p-4">
        <div className="lat text-lg">Lat. {coordinates.lat}</div>
        <div className="lon text-lg">Long. {coordinates.lon}</div>
      </div>
      <div className="weather p-4">
        <div className="temp text-2xl">{temperature}</div>
      </div>
      <div className="Aqi p-4">
        <div className="text-xl font-bold">{aqi}</div>
      </div>
      <hr className="my-4" />
      <div className="parameters grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>Ozone (O<sub>3</sub>)</div>
            <div className="text-sm">Last Update: {lastUpdateTimes.o3}</div>
          </div>
          <hr className="my-2" />
          <div className="o3-value"> {parameters.o3} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>CO</div>
            <div className="text-sm">Last Update: {lastUpdateTimes.co}</div>
          </div>
          <hr className="my-2" />
          <div className="co-value"> {parameters.co} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>SO<sub>2</sub></div>
            <div className="text-sm">Last Update: {lastUpdateTimes.so2}</div>
          </div>
          <hr className="my-2" />
          <div className="so2-value"> {parameters.so2} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>NO<sub>2</sub></div>
            <div className="text-sm">Last Update: {lastUpdateTimes.n02}</div>
          </div>
          <hr className="my-2" />
          <div className="no2-value"> {parameters.n02} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>PM<sub>10</sub></div>
            <div className="text-sm">Last Update: {lastUpdateTimes.pm10}</div>
          </div>
          <hr className="my-2" />
          <div className="pm10-value"> {parameters.pm10} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>PM<sub>2.5</sub></div>
            <div className="text-sm">Last Update: {lastUpdateTimes.pm25}</div>
          </div>
          <hr className="my-2" />
          <div className="pm25-value"> {parameters.pm25} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>NO</div>
            <div className="text-sm">Last Update: {lastUpdateTimes.no}</div>
          </div>
          <hr className="my-2" />
          <div className="no-value"> {parameters.no} </div>
        </div>
        <div className="air-parameters border border-gray-300 rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div>NH<sub>3</sub></div>
            <div className="text-sm">Last Update: {lastUpdateTimes.nh3}</div>
          </div>
          <hr className="my-2" />
          <div className="nh3-value"> {parameters.nh3} </div>
        </div>

        {/* Continue the rest of the parameters similarly */}
      </div>
    </div>
  );
};

export default CustomLocation;
