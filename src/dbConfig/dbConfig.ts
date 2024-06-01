import mongoose from 'mongoose';

export async function connect() {
  try {
    const uri = process.env.MONGO_URI!; // Get the MongoDB connection URI from your environment variable

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri); 

    const connection = mongoose.connection; // Get the connection object

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit(1); // Exit the process if there's an error
    });

    return connection; 
  } catch (error) {
    console.error('Something went wrong while connecting to MongoDB!');
    console.error(error);
    throw error; // Re-throw the error
  }
}