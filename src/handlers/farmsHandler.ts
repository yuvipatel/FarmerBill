import express = require('express');
import * as moment from 'moment-timezone';
import { Farms, IFarms } from '../models/farms';

const createFarms = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
        areaInAcre,
        village,
        crop,
        sowingDate
    } = req.body;

    const farmsObj: any = {
        farmerId: req.params.farmerId,
        areaInAcre,
        village,
        crop,
        sowingDate
    };

    try {
        if (sowingDate && !moment(sowingDate).isBefore(moment())) {
            return res.status(400).json({
                message: `sowing date should not be future date.`
            });
        }
        if (sowingDate) {
            farmsObj.status = 'Growing';
        }

        const farmModel = new Farms(farmsObj);
        const farmDocument = await farmModel.save();

        res.status(200).json({
            farmId: farmDocument.id
        });
    } catch (error) {
        res.status(500).json({
            message: `something went wrong!`
        });
    }
};

export default {
    createFarms
};
