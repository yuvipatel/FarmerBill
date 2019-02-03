import * as http from 'http';
import app from './app';
import config from './config';

http.createServer(app)
  .listen(config.PORT, (err) => {
    if (err) {
      return console.error(err);
    }

    console.info(`server running with following config:`);

    // log all environment variables on server start
    Object.keys(config).forEach((key) => {
      if (!key.endsWith('KEY')) {
        console.info(`${key} : ${config[key]}`);
      }
    });
  });
