const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Purchase = mongoose.model('Purchase', purchaseSchema, 'orders');
module.exports = Purchase;