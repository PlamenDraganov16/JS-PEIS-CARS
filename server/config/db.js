import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODBURI)
        console.log('MongoDB Connected');
    } catch (err) {
        console.log(err);
    }   
}

export default connectDB;


