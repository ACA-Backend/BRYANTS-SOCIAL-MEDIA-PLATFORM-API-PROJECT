import { server } from './boot/server.js';
import appConfig from './config/appConfig.js';
import { initializeDatabaseConnection } from './config/dbConfig.js';

(async () => {
  try {
    // Initializing the database connection
    initializeDatabaseConnection();

    //code to start the server
    server.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}`);
    });
  } catch (error) {
    console.error('The server could not be started', error);
    process.exit(1);
  }
})();
