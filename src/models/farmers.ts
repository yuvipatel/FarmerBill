import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FarmersSchema = new Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  language: { type: String }
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

export interface IFarmers extends mongoose.Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  language: string;
}

export const Farmers = mongoose.model<IFarmers>('farmers', FarmersSchema);
