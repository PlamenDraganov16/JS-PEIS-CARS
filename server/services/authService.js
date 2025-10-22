import User from "../models/user.js";

import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/tokenUtils.js";


export default {
    async register(userData) {
        const userExists = await User.exists({username: userData.username});
        if (userExists) {
            throw new Error('User Already Exists!');
        }

        const user = await User.create(userData);

        const token = generateAuthToken(user);

        return token;
    },
    async login(username, password) {
        // Validate user
        const user = await User.findOne({ username });

        if(!user) throw new Error('Invalid user or passsword!');

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) throw new Error('Invalid user or password!');
        
        // Create token
        const token = generateAuthToken(user);

        return token;
    }
}