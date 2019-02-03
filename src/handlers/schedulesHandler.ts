import express = require('express');
import * as moment from 'moment-timezone';
import { Farmers } from '../models/farmers';
import { IFarms } from './../models/farms';
import { Fertilisers, IFertiliser } from './../models/fertilisers';
import { Schedules } from './../models/schedules';

const createSchedule = async (req: express.Request & any, res: express.Response, next: express.NextFunction) => {
    const {
        daysAfterSowing,
        quantity,
        quantityUnit,
        fertiliserId
    } = req.body;

    const farm: IFarms = req.farm;
    const scheduleDate = moment(farm.sowingDate).add(daysAfterSowing, 'days');

    const scheduleObj = {
        daysAfterSowing,
        scheduleDate,
        quantity,
        quantityUnit,
        fertiliserId,
        farmId: req.params.farmId,
        status: 'Pending'
        };
    try {
        const fertiliser = await Fertilisers.findById(fertiliserId);
        if (!fertiliser) {
            return res.status(400).json({
                message: `Invalid fertiliser id!`
            });
        }
        if (!isValidQuantityUnitForFertiliser(fertiliser, quantityUnit)) {
            return res.status(400).json({
                message: `Invalid quantity unit for Fertiliser!`
            });
        }
        // not sure if validation for existing schedules with same 'daysAfterSowing' is required.

        const schedulDocument = await new Schedules(scheduleObj).save();

        res.status(200).json({
            scheduleId: schedulDocument.id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

const isValidQuantityUnitForFertiliser = (fertiliser: IFertiliser, quantityUnit: string): boolean => {
    return fertiliser.pricing[quantityUnit];
};

const getSchedules = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const date = req.query.date;
    const status = req.query.status;
    const startOfDay: any = moment(date).startOf('day');
    const endOfDay: any = moment(date).endOf('day');

    const schedulesQuery = { $and: [
            { scheduleDate: { $gte : new Date(startOfDay)} },
            { scheduleDate: { $lt : new Date(endOfDay)} },
            { status }
        ]};

    try {

        const schedules = await Schedules.find(schedulesQuery).lean().exec();
        res.status(200).json({
            schedules
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
};

export default {
    createSchedule,
    getSchedules
};
