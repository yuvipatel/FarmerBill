// load configs from .env file
import * as dotEnv from 'dotenv-safe';

// uncomment comment inside load method, if we want to allow empty environment variables
dotEnv.load({
  // allowEmptyValues: true
});

/**
 * Config class with all app configs
 */
const Config = {
  DB_URL: process.env.DB_URL,
  ENV: process.env.ENV,
  PORT: process.env.APP_PORT,
};

export default Config;
