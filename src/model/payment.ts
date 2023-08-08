import mongoose, { Schema } from 'mongoose';

// Interface for the Payment document
interface payment  {
  amount: number;
  currency: string;
  receipt: string;
  notes?: string;
}

// Define the Payment schema
const paymentSchema: Schema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  notes: String,
});

// Create and export the Payment model
export default mongoose.model<payment>('Payment', paymentSchema);
