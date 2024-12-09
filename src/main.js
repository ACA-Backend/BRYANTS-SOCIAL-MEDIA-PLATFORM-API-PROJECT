import { server } from './boot/server.js'
import appConfig from './config/appConfig.js';
import { initializeDatabaseConnection } from './config/dbConfig.js';
console.log("current directory:", process.cwd());

(async () => {
  try {
    // Initializing the database connection
    const env = process.env.NODE_ENV || 'development';
   await initializeDatabaseConnection(env);

    //code to start the server
    server.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
    });
  } catch (error) {
    console.error('The server could not be started', error);
    process.exit(1);
  }
})();
