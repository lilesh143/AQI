import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../dbConfig/dbConfig"; // Adjust path if needed

interface CityData {
  cityName: string;
  humanPopulation: number;
  treesPopulation: number;
  year: number;
}

// Define a named export function for the GET method
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = await connect();
    const db = connection.db;
    const collection = db.collection<CityData>("cities");

    const cityName = req.query.cityName as string; 
    const result = await collection.findOne({ cityName });

    if (result) {
      res.status(200).json(result); 
    } else {
      res.status(404).json({ message: "City not found" });
    }

    connection.close(); 
  } catch (error) {
    console.error("Error fetching city data:", error);
    res.status(500).json({ message: "Server error" });
  }
}