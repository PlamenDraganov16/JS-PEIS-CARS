import User from "../models/user.js";

import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/tokenUtils.js";


export default {
    async register(userData) {
        const userExists = await User.exists({email: userData.email});
        if (userExists) {
            throw new Error('User Already Exists!');
        }

        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
    }
}