import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Purchase = model('Purchase', purchaseSchema, 'orders');

export default Purchase;