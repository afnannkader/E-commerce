const User = require('../models/user')

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email + " " + password);

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email, password });
    if (!user) {
      // If the user doesn't exist, return an error response
      return res.status(401).json({ success: false, message: 'Incorrect email' });
    }
    if (password == !user.password) {
      return res.status(401).json({ success: false, message: "Password does not match" })
    }
    if (email == user.email && password === user.password) {
      
      res.send({ id: user._id })
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
module.exports = { Login }