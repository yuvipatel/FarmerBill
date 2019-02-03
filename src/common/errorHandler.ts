import * as _ from 'lodash';

/**
 * Generic error handler for handling all http errors
 */
const errorHandler = (err, req, res, next): any => {
  const errorObj: any = {
    status: 500,
    res: { message: 'Something went wrong!' }
  };

  if (err.name === 'MongoError' && err.message && err.message.startsWith('E11000')) {
    const field = err.message.split('index:')[1];
    let key = field.split(' dup key')[0];
    let value = field.split(' dup key')[1];
    key = key.substring(0, field.lastIndexOf('_')); // returns field name
    value = value.replace('{ : ', '').replace(' }', '').replace(' \"', '');

    errorObj.status = 409;
    errorObj.res = { message: `Duplicate entry value ${value} for field${key}!` };
  } else if (err.name === 'CastError') {
    errorObj.status = 400;
    errorObj.res = { message: err.message };
  } else if (err.message && err.message.startsWith('Cast to ObjectId')) {
    errorObj.status = err.statusCode ? err.statusCode : 500;
    errorObj.res = { message: 'Invalid id, please check your request.' };
  }

  console.error(err);
  res.status(errorObj.status).json(errorObj.res);

  return errorObj;
};

const joiErrorHandler = (err, req, res, next): any => {
  if (err.isJoi && !_.isEmpty(err.details)) {
    const regex = /"/gi;
    let message = err.details[0].message;
    message = message.replace(regex, '');
    res.status(400).json({ message });
  } else {
    next(err);
  }
};

export default {
  errorHandler,
  joiErrorHandler
};
