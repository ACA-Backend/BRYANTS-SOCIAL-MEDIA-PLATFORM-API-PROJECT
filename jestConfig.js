/** @type {import('jest').Config} */
const config = {
  testEnvironment: "node",
  
  collectCoverage: true,
  coverageProvider: "v8",
  
  moduleFileExtensions: [
    "js",
    "mjs",
    "json",
    "node"
  ],
  
  //this code is going to transform ES Modules using babel-jest
  transform: {
    "^.+\\.mjs$": "babel-jest"
  },
  
  //this will ignore node_modules directory
  testPathIgnorePatterns: ["/node_modules/"],

  //code to enable verbose( or more detailed ) test output.
  verbose: true
};

export default config;

