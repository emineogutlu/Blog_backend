const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.status(201).json({ token: generateToken(user) });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed.', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });

    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
};






// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// require('dotenv').config();
// const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hash = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hash });
//     await user.save();
//     res.status(201).json({ token: generateToken(user) });
//   } catch (err) {
//     res.status(400).json({ message: 'Kayıt başarısız', error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Şifre yanlış' });

//     res.json({ token: generateToken(user) });
//   } catch (err) {
//     res.status(500).json({ message: 'Giriş başarısız', error: err.message });
//   }
// };





// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword });
//     res.status(201).json({ message: 'Kayıt başarılı', user });
//   } catch (err) {
//     res.status(400).json({ message: 'Kayıt başarısız', error: err.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Hatalı şifre' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.status(200).json({ message: 'Giriş başarılı', token });
//   } catch (err) {
//     res.status(500).json({ message: 'Giriş başarısız', error: err.message });
//   }
// };

// module.exports = { register, login };