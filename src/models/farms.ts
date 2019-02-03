import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const FarmsSchema = new Schema({
  areaInAcre: { type: Number, required: true },
  village: { type: String, required: true },
  crop: { type: String },
  sowingDate: { type: Date },
  status: { type: String, required: true },
  farmerId: { type: objectId, ref: 'farmers', required: true },
  pendingSchedules: [ objectId ]
}, {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
      }
    }
  });

export interface IFarms extends mongoose.Document {
  areaInAcre: number;
  village: string;
  crop: string;
  sowingDate: Date;
  status: string;
  farmerId: string;
  pendingSchedules: string[];
}

export const Farms = mongoose.model<IFarms>('farms', FarmsSchema);
