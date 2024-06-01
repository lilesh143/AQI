import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../dbConfig/dbConfig"; // Adjust path if needed

interface CityData {
  cityName: string;
  humanPopulation: number;
  treesPopulation: number;
  year: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const connection = await connect(); 
    const db = connection.db;
    const collection = db.collection<CityData>("cityData"); // Access the "cities" collection

    const cityName = req.query.cityname as string; // Get city name from query parameter
    const result = await collection.findOne({ cityName }); // Find city by name

    if (result) {
      res.status(200).json(result); // Send city data as JSON response
    } else {
      res.status(404).json({ message: "City not found" });
    }

    connection.close(); 
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).json({ message: "Server error" });
  }
}