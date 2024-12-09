import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const { MONGO_URI, STAGING_MONGO_URI, TEST_MONGO_URI, DEV_MONGO_URI } = process.env;

 const initializeDatabaseConnection = async (env) => {
  try {
    let uri;

    // Determining the correct URI based on environment
    if (env === 'production') {
      uri = MONGO_URI;
    } else if (env === 'staging') {
      uri = STAGING_MONGO_URI;
    } else if (env === 'test') {
      uri = TEST_MONGO_URI;
    } else if (env === 'development') {
      uri = DEV_MONGO_URI;
    } else {
      throw new Error(`Unknown environment: ${env}`);
    }

    if (!uri) {
      throw new Error('Database URI is undefined. Please check your .env configuration.');
    }

    // Connecting to MongoDB
    await mongoose.connect(uri);

    console.log(`Connected to the MongoDB ${env} database successfully.`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    throw error; 
  }
};

//the function to wipe the database 
const wipeDatabaseTables = async () => {
  if (mongoose.connection.readyState === 1) { //this code will ensure connection is established
    await mongoose.connection.dropDatabase();
    console.log('Database tables wiped successfully');
  }
};

export { initializeDatabaseConnection, wipeDatabaseTables };



