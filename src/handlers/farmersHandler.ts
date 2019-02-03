import express = require('express');
import { Farmers } from '../models/farmers';
import { Farms } from './../models/farms';
import { ISchedules, Schedules } from './../models/schedules';

const createFarmer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        language
    } = req.body;

    const farmersObj = { firstName, lastName, phoneNumber, language };

    try {
        const existingFarmer = await Farmers.findOne({ phoneNumber }).exec();
        if (!existingFarmer) {
            const farmerModel = new Farmers(farmersObj);
            const farmerDocument = await farmerModel.save();

            res.status(200).json({
                farmerId: farmerDocument.id
            });
        } else {
            res.status(400).json({
                message: 'Farmer with phone already exist'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

const getFarmers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = req.query.status;
    try {
        const farmers = await Farms.find({status}).populate({ path: 'farmerId', select: '*' }).lean();
        // need to remove duplicate if any

        res.status(200).json({
            farmers
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

const getBill = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const farmerId = req.params.farmerId;
        const farmersId = await Farms.find({farmerId}, { _id: 1});
        const schedules = await Schedules.find({ farmId: { '$in': farmersId }}).populate({ path: 'fertiliserId'});

        const bills = calculateBill(schedules);
        res.status(200).json({
            bills
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

const calculateBill = (schedules) => {
    let pendingScheduleBill: number = 0;
    let executedScheduleBill: number = 0;
    for (const schedule of schedules) {
        let bill: number = 0;
        const pricingPerUnit = schedule.fertiliserId.pricing[schedule.quantityUnit];

        bill = pricingPerUnit * schedule.quantity;

        if (schedule.status === 'Pending') {
            pendingScheduleBill += bill;
        } else if (schedule.status === 'Executed') {
            executedScheduleBill += bill;
        }
    }
    return { pendingScheduleBill, executedScheduleBill };
};

export default {
    createFarmer,
    getFarmers,
    getBill
};
