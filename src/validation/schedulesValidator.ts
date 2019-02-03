import { Joi } from 'celebrate';

const schedulesSchema = {
    daysAfterSowing: Joi.number().positive().required(),
    fertiliserId: Joi.string().required(),
    quantity: Joi.number().positive().required(),
    quantityUnit: Joi.string().valid(['ton', 'kg', 'ltr', 'ml']).required()
};

const getSchedulesQuerySchema = {
    date: Joi.date().iso().required(),
    status: Joi.string().valid(['Pending', 'Executed']).required()
};

export {
    schedulesSchema,
    getSchedulesQuerySchema
};
