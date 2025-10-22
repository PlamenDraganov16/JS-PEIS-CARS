import Car from '../models/car.js'
import Review from '../models/review.js'

export async function getCars(searchTerm) {
    if (searchTerm) return await Car.find({ name: { $regex: searchTerm, $options: 'i' } });

    return await Car.find().sort({ createdAt: -1 });
};

export async function getCarsById(id) {
    const car = await Car.findById(id);

    if (!car) throw new Error('Car not found!');

    const reviews = await Review.find().sort({ createdAt: -1 });

    return { car, reviews };
}