import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import User from '../models/user.js';

dotenv.config();

export const signIn = async (req, res) => {
  const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email: email.toLowerCase() }).exec();
		if (!existingUser) return res.status(404).json({ message: 'User dosn\'t exist' });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
		if(!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect Password' });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
		res.status(200).json({ result: existingUser, token })

	} catch (error) {
		res.status(500).json({ message: 'Something went wrong. Please Try Again Later' })
	}
}

export const signUp = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;
	try {
		const existingUser = await User.findOne({ email: email.toLowerCase() }).exec();
		if (existingUser) return res.status(400).json({ message: 'User already exist.' });

		if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match' });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({ email: email.toLowerCase(), password: hashedPassword, name: `${firstName} ${lastName}` })

		const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

		res.status(200).json({ result, token })

	} catch (error) {
		res.status(500).json({ message: 'Something went wrong. Please Try Again Later' })
	}
}