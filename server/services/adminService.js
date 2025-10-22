import Car from '../models/car.js';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default {
  async registerAdmin(userData) {
    const exists = await User.exists({ username: userData.username });
    if (exists) throw new Error('User already exists');

    const user = await User.create(userData);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    return token;
  },

  async loginAdmin(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    return token;
  },

  async addCar(carData, images) {
    const newCar = new Car({ ...carData, images });
    await newCar.save();
    return newCar;
  },

  async editCar(carId, carData) {
    const car = await Car.findById(carId);
    if (!car) throw new Error('Car not found');

    Object.assign(car, carData);
    await car.save();
    return car;
  },

  async deleteCar(carId) {
    await Car.deleteOne({ _id: carId });
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