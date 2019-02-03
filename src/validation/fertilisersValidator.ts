import { Joi } from 'celebrate';

const pricingSchema = {
    kg: Joi.number().positive().optional(),
    ton: Joi.number().positive().optional(),
    ltr: Joi.number().positive().optional(),
    ml: Joi.number().positive().optional()
};

const fertiliserSchema = {
    name : Joi.string().trim().required(),
    type : Joi.string().trim().valid(['Solid', 'Liquid']).required(),
    detail: Joi.string().trim().optional(),
    pricing: Joi.object(pricingSchema)
            .with('kg', 'ton')
            .with('lts', 'ml')
            .without('kg', ['ltr', 'ml'])
            .without('ton', ['ltr', 'ml'])
            .without('ltr', ['kg', 'ton'])
            .without('ml', ['kg', 'ton'])
    };

export {
    fertiliserSchema
};
