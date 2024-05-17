const User = require('../models/user');

const Register = async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send(" This Email is already registered!!!");
        }

        // If the email doesn't exist, proceed with user registration
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { Register };