import Car from '../models/car.js';
import Review from '../models/review.js';
import Purchase from '../models/buy.js';

export default {
    async addCar(carData, images) {
        const newCar = new Car({ ...carData, images });
        await newCar.save();
        return newCar;
    },

    async editCar(carId, carData, images = []) {
        const car = await Car.findById(carId);
        if (!car) throw new Error('Car not found');

        Object.assign(car, carData);
        if (images.length) car.images = images;

        await car.save();
        return car;
    },

    async deleteCar(carId) {
        const result = await Car.deleteOne({ _id: carId });
        if (result.deletedCount === 0) throw new Error('Car not found');
    },

    async getDashboardData() {
        const reviews = await Review.find().sort({ createdAt: -1 });
        const purchases = await Purchase.find().sort({ createdAt: -1 });
        return { reviews, purchases };
    },

    async getCarList() {
        const cars = await Car.find().sort({ createdAt: -1 });
        return cars;
    },

    async getCarById(carId) {
        const car = await Car.findById(carId);
        if (!car) throw new Error('Car not found');
        return car;
    },
};