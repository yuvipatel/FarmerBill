import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId;

const BooksSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  availableToLend: { type: Boolean, required: true, default: true },
  lendBy: { type: objectId, ref: 'Users'}
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

export interface IBook extends mongoose.Document {
  title: string,
  author: string,
  availableToLend: string,
  lendBy: string
}
BooksSchema.index({ 'title': 'text' });
export const Books = mongoose.model<IBook>('Books', BooksSchema);
