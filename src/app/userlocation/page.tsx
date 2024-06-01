"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { connect } from "../../dbConfig/dbConfig"; // Import your connect function
interface AirComponents {
  co: string;
  no: string;
  no2: string;
  o3: string;
  so2: string;
  pm2_5: string;
  pm10: string;
  nh3: string;
}

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface PositionError {
  message: string;
}

interface AirPollutionData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: AirComponents;
  }>;
}

interface CityNameData {
  name: string;
}

// Define the type for your city data
interface CityData {
  cityName: string; // Corrected field name
  humanPopulation: number;
  treesPopulation: number;
  year: number;
}

const AirPollutionIndicator: React.FC = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [airQuality, setAirQuality] = useState<string>("...");
  const [airQualityStatus, setAirQualityStatus] = useState<string>("...");
  const [components, setComponents] = useState<AirComponents>({
    co: "",
    no: "",
    no2: "",
    o3: "",
    so2: "",
    pm2_5: "",
    pm10: "",
    nh3: "",
  });
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onPositionGathered,
        onPositionGatherError
      );
    } else {
      onPositionGatherError({
        message: "Can't Access your location. Please enter your co-ordinates",
      } as PositionError);
    }
  };

  const onPositionGathered = (pos: Position) => {
    const lat = pos.coords.latitude.toFixed(4);
    const lon = pos.coords.longitude.toFixed(4);
    setLatitude(lat);
    setLongitude(lon);
    getCityName(lat, lon);
    getAirQuality(lat, lon);
  };

  const getCityName = async (lat: string, lon: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=8774b26414ab041bce77e51bcf64f61f`
      );
      const data: CityNameData[] = await response.json();
      const cName = data[0]?.name || "Unknown";
      setCityName(cName);
      console.log(cityName);
    } catch (error) {
      console.error(error);
      setCityName("Unknown");
    }
  };

  const getAirQuality = async (lat: string, lon: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=8774b26414ab041bce77e51bcf64f61f`
      );
      const airData: AirPollutionData = await response.json();
      setAirQualityValues(airData);
      setAirComponents(airData);
    } catch (error) {
      onPositionGatherError({
        message: "Something went wrong. Check your internet connection.",
      } as PositionError);
      console.error(error);
    }
  };

  const setAirQualityValues = (airData: AirPollutionData) => {
    const aqi = airData.list[0].main.aqi;
    let airStatus = "";
    let color = "";

    switch (aqi) {
      case 1:
        airStatus = "Good";
        color = "rgb(19, 201, 28)";
        break;
      case 2:
        airStatus = "Fair";
        color = "rgb(15, 134, 25)";
        break;
      case 3:
        airStatus = "Moderate";
        color = "rgb(201, 204, 13)";
        break;
      case 4:
        airStatus = "Poor";
        color = "rgb(204, 83, 13)";
        break;
      case 5:
        airStatus = "Very Poor";
        color = "rgb(204, 13, 13)";
        break;
      default:
        airStatus = "Unknown";
    }

    setAirQuality(aqi.toString());
    setAirQualityStatus(airStatus);
    setAirQualityStatusColor(color);
  };

  const setAirQualityStatusColor = (color: string) => {
    const statusElement = document.querySelector(
      ".air-quality-status"
    ) as HTMLElement;
    if (statusElement) {
      statusElement.style.color = color;
    }
  };

  const setAirComponents = (airData: AirPollutionData) => {
    const componentsData = airData.list[0].components;
    setComponents(componentsData);
  };

  const onPositionGatherError = (error: PositionError) => {
    const errorMessage = error.message;
    const errorLabel = document.querySelector(
      "label[for='error-msg']"
    ) as HTMLElement;
    if (errorLabel) {
      errorLabel.innerText = errorMessage;
    }
  };

  const handleSearch = () => {
    getAirQuality(
      parseFloat(latitude).toFixed(4),
      parseFloat(longitude).toFixed(4)
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to fetch city data from MongoDB
  const fetchCityData = async (cityName: string) => {
    try {
      console.log(cityName);
      const response = await axios.get(`/api/users/citydata`, {
        params: { cityName: {cityName} }, // Pass cityName as a query parameter
      });
      console.log(response.data);
      setCityData(response.data);
    } catch (error) {
      console.error("Error fetching city data console:", error);
      setError("Error fetching city data err.");
    }
  };


  useEffect(() => {
    // Fetch city data when cityName is available
    if (cityName) {
      console.log(cityName);
      fetchCityData(cityName);
    }
  }, [cityName]);

  useEffect(() => {
    // Fetch city data when cityName is available
    if (cityName) {
      console.log(cityName);
      fetchCityData(cityName);
    }
  }, [cityName]);

  return (
    <div>
      <nav className="bg-gradient-to-r p-5 from-blue-500 to-indigo-600 text-white py-4 shadow-lg">
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
      <div className="container mx-auto flex-col justify-center align-middle p-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Air Pollution Indicator
        </h1>
        <div className="bg-white shadow-lg max-w-screen-xl  m-auto text-black rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="error-msg"
              className="text-gray-600 self-center text-center"
            >
              Co-ordinates of your location
            </label>
            <br />
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              step="0.0001"
              className="border text-black rounded p-2 w-full mb-2"
            />
            <input
              type="number"
              name="lon"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              step="0.0001"
              className="border text-black rounded p-2 w-full mb-2"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-black">
              Air Quality Index:
            </h2>
            <h2 className="text-2xl font-semibold text-black">{cityName}</h2>
            <div className="flex justify-center items-center mt-2">
              <span className="text-2xl text-black">{airQuality}</span>
              <span className="text-xl mx-2 text-black">→</span>
              <span className="text-2xl air-quality-status">
                {airQualityStatus}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Concentration of pollutants in air:
            </h2>
            {Object.entries(components).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center border-b py-2"
              >
                <h3 className="font-medium text-black">{key.toUpperCase()}:</h3>
                <span className="text-sm text-black">{value} μg/m³</span>
              </div>
            ))}
          </div>

          {/* Display City Data if available */}
          {/* Display city data if available */}
          {cityData && (
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h2 className="text-xl font-semibold mb-4 text-black">
                City Data for {cityData.cityName}:
              </h2>
              <p className="text-black">
                Human Population: {cityData.humanPopulation}
              </p>
              <p className="text-black">
                Number of Trees: {cityData.treesPopulation}
              </p>
              <p className="text-black">Year: {cityData.year}</p>
              {/* Add more data fields as needed */}
            </div>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
        <footer className="text-center mt-8"></footer>
      </div>
    </div>
  );
};

export default AirPollutionIndicator;
