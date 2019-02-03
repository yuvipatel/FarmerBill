import express = require('express');
import { Fertilisers } from './../models/fertilisers';

const createFertiliser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
        name,
        type,
        detail,
        pricing
    } = req.body;

    const farmsObj = {
        name,
        type,
        detail,
        pricing
    };

    try {
        if (type === 'Solid' && (pricing.ltr || pricing.ml)) {
            return res.status(400).json({
                message: `Pricing should be in kg and ton for Solid fertiliser`
            });
        }
        if (type === 'Liquid' && (pricing.kg || pricing.ton)) {
            return res.status(400).json({
                message: `Pricing should be in ltr and ml for Liquid fertiliser`
            });
        }
        const existingFertiliser = await Fertilisers.findOne({ name }).exec();
        if (!existingFertiliser) {
            const existingFertiserModel = new Fertilisers(farmsObj);
            const fertiliserrDocument = await existingFertiserModel.save();

            res.status(200).json({
                fertiliser: fertiliserrDocument.id
            });
        } else {
            res.status(400).json({
                message: `Fertiliser with name ${name} already exist`
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `something went wrong!`
        });
    }
};

export default {
    createFertiliser
};
