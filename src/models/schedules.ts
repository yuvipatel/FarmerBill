import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const SchedulesSchema = new Schema({
  daysAfterSowing: { type: Number },
  scheduleDate: { type: Date },
  fertiliserId: { type: objectId, ref: 'fertilsers' },
  quantity: { type: Number },
  quantityUnit:  { type: String },
  farmId : { type: objectId, ref : 'farms'},
  status : { type: String}
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

export interface ISchedules extends mongoose.Document {
  daysAfterSowing: number;
  fertiliserId: string;
  quantity: number;
  quantityUnit: string;
  farmId: string;
  status: string;
}

export const Schedules = mongoose.model<ISchedules>('schedules', SchedulesSchema);
