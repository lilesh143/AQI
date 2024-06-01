import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CityData {
  cityName: string;
  humanPopulation: number;
  treesPopulation: number;
  year: number;
}

const CityDataComponent: React.FC = () => {
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: CityData[] }>('/api/city-data');
        setCityData(response.data.data);
      } catch (error) {
        setError('Error fetching city data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>City Data</h2>
      {error && <p>{error}</p>}
      <ul>
        {cityData.map((city, index) => (
          <li key={index}>
            <strong>City Name:</strong> {city.cityName}<br />
            <strong>Human Population:</strong> {city.humanPopulation}<br />
            <strong>Trees Population:</strong> {city.treesPopulation}<br />
            <strong>Year:</strong> {city.year}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityDataComponent;
