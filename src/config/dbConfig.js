import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

//the function to initialize the database connection.
const initializeDatabaseConnection = (env) => {
  const { MONGO_URI, STAGING_MONGO_URI, TEST_MONGO_URI } = process.env;

  let mongoUri;
  switch (env) {
    case "development":
      mongoUri = MONGO_URI;
      break;
    case "staging":
      mongoUri = STAGING_MONGO_URI;
      break;
    case "test":
      mongoUri = TEST_MONGO_URI;
      break;
    default:
      mongoUri = MONGO_URI;
  }

  //code to connect to MongoDB with relevant URI
  mongoose.connect (mongoUri);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log(`Connected to MongoDB (${env} environment)`);
  });
};

//the function to wipe the database 
const wipeDatabaseTables = async () => {
  if (mongoose.connection.readyState === 1) { //this code will ensure connection is established
    await mongoose.connection.dropDatabase();
    console.log('Database tables wiped successfully');
  }
};

export { initializeDatabaseConnection, wipeDatabaseTables };
