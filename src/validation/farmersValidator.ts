import { Joi } from 'celebrate';

// Regular expression for phone number validation
const phoneRegex = /^[1-9]{1}\d{9}$/;

const farmersSchema = {
    firstName :  Joi.string().trim().required(),
    lastName : Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().regex(phoneRegex).required(),
    language: Joi.string().trim().required()
};

const getFarmersQuerySchema = {
    status: Joi.string().trim().valid(['Growing', 'Harvest', 'readyToSow']).optional()
};

export {
    farmersSchema,
    getFarmersQuerySchema
};
