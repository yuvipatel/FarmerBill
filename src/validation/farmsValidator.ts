import { Joi } from 'celebrate';

const farmsSchema = {
    areaInAcre: Joi.number().positive().required(),
    village: Joi.string().trim().required(),
    sowingDate: Joi.date().iso().optional(),
    crop: Joi.string().optional()
};

export {
    farmsSchema
};
