const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true,  
    },
    price: {
        type: Number,
        required: true,  
        min: 0,  
    },
    fuel: {
        type: String,
        required: true,  
    },
    type: {
        type: String,
        required: true,  
    },
    brand: {
        type: String,
        required: true, 
    },
    transmission: {
        type: String,
        required: true,  
    },
    image: {
        type: String,
        required: false,  
    },
    shortDescr: {
        type: String,
        required: true,  
    },
    longDescr: {
        type: String,
        required: true,  
    },
    images:{
        type: [String],
        required: false,
    },
}, { timestamps: true });  

const Car = mongoose.model('Car', carSchema, 'cars');
module.exports = Car;