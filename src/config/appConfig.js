import { config} from 'dotenv';
config();

const appConfig = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwt: {
        secret: process.env.JWT_SECRET, 
        expiresIn: '1h' 
    }
};

export default appConfig;
