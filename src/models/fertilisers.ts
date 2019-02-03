import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const pricingSchema = new Schema({
    kg: { type: Number },
    ton: { type: Number },
    ltr: { type: Number },
    ml: { type : Number }
});

interface IPricing {
    kg: number;
    ton: number;
    ltr: number;
    ml: number;
}

const FertilisersSchema = new Schema({
  name: { type: String, required: true },
  pricing: { type: pricingSchema },
  type: { type: String , description: ` either liquied or solid`},
  detail: { type: String, description: `It contains textualdetails about fertilisers.` }
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

export interface IFertiliser extends mongoose.Document {
  name: string;
  pricing: IPricing;
  type: string;
  detail: string;
}

export const Fertilisers = mongoose.model<IFertiliser>('fertilsers', FertilisersSchema);
