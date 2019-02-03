
import { celebrate as validate } from 'celebrate';
import * as express from 'express';
import ErrorHandler from './../common/errorHandler';
import * as Utilites from './../common/utilities';
import FamersHandler from './../handlers/farmersHandler';
import FarmsHandler from './../handlers/farmsHandler';
import FertiliserHandler from './../handlers/fertiliserHandler';
import SchedulesHandler from './../handlers/schedulesHandler';
import * as FarmersValidator from './../validation/farmersValidator';
import * as FarmsValidator from './../validation/farmsValidator';
import * as FertilisersValidator from './../validation/fertilisersValidator';
import * as SchedulesValidator from './../validation/schedulesValidator';

const defineRoutes = (app: express.Application): void => {

  app.post(
      '/farmers',
      validate({
        body: FarmersValidator.farmersSchema
      }),
      FamersHandler.createFarmer
    );

  app.get(
      '/farmers',
      validate({
        query: FarmersValidator.getFarmersQuerySchema
      }),
      FamersHandler.getFarmers
    );

  app.post(
      '/farmers/:farmerId/action/bill',
      FamersHandler.getBill
    );

  app.post(
      '/farmers/:farmerId/farms',
      validate({
        body: FarmsValidator.farmsSchema
      }),
      FarmsHandler.createFarms
    );

  app.post(
    '/fertilisers',
    validate({
      body: FertilisersValidator.fertiliserSchema
    }),
    FertiliserHandler.createFertiliser
  );

  app.post(
    '/farmers/:farmerId/farms/:farmId/schedules',
    validate({
      body: SchedulesValidator.schedulesSchema
    }),
    SchedulesHandler.createSchedule
  );

  app.get(
    '/schedules',
    validate({
      query: SchedulesValidator.getSchedulesQuerySchema
    }),
    SchedulesHandler.getSchedules
  );
  app.use(ErrorHandler.joiErrorHandler);
  app.use(ErrorHandler.errorHandler);

  app.param('farmerId', Utilites.validateFarmerId);
  app.param('farmId', Utilites.validateFarmId);
};

export { defineRoutes };
