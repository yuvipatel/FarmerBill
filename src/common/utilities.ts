import { Farmers } from './../models/farmers';
import { Farms } from './../models/farms';

const validateFarmerId = async (req, res, next, farmerId) => {
    try {
      const farmer: any = await Farmers.findById(
        farmerId,
        { __v: 0, updatedAt: 0, createdAt: 0 }
      ).exec();

      if (!farmer) {
        res.status(403).json({ message: 'Invalid farmerId.'});
      } else {
        req.farmer = farmer;
        next();
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal Server error!'
      });
    }
  };

const validateFarmId = async (req, res, next, farmId) => {
    try {
      const farm: any = await Farms.findById(
        farmId,
        { __v: 0, updatedAt: 0, createdAt: 0 }
      ).exec();

      if (!farm) {
        res.status(403).json({ message: 'Invalid farmId.'});
      } else {
        req.farm = farm;
        next();
      }
    } catch (err) {
      res.status(500).send({
        message: 'Internal Server error!'
      });
    }
  };

export {
    validateFarmerId,
    validateFarmId
};
