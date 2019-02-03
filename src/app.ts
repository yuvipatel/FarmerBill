import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Config from './config';
import { defineRoutes } from './routes/routes';

const app: express.Application = express();
app.use(cors());
app.options('*', cors()); // include before other routes

const mountRoutes = (): void => {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  defineRoutes(app);
}

const setupDb = (): mongoose.MongooseThenable => {
  // Use native promises for mongoose. Refer http://mongoosejs.com/docs/promises.html for details
  (mongoose as any).Promise = Promise;

  return mongoose.connect(Config.DB_URL, {
    useMongoClient: true
  });

}

setupDb()
  .then(() => {
    mountRoutes();
  }, (err) => {
    console.info('DB Setup Error ', err);
  });
  
export default app;
