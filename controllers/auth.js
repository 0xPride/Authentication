const User = require('../models/users')
const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

const createJwtToken = id => jwt.sign({ id }, process.env.SECRUT, {
  expiresIn: Number(process.env.JWT_TOKEN_AGE)
});

module.exports.getSignupPage = (_, res) => res.render('signup');

module.exports.getLoginPage = (_, res) => res.render('login');

module.exports.addUserToDb = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({
      message: 'please provide all the data'
    })
  const newUser = await User.create({ name, email, password })
  if (!newUser) {
    res.status(400).json({
      message: 'cant create user'
    })
  }
  res.cookie('jwt', createJwtToken(newUser._id), {
    httpOnly: true,
    maxAge: Number(process.env.JWT_COOKIE_AGE)
  })
  res.status(201).json({ id: newUser._id, name: newUser.name, email: newUser.email });
}

module.exports.logUserIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'please provide email and passwod' });
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'there is no user  with this email and password' })
  if (user.password != password)
    return res.status(400).json({ message: 'wrong password' })
  res.cookie('jwt', createJwtToken(user._id), {
    httpOnly: true,
    maxAge: Number(process.env.JWT_COOKIE_AGE)
  })
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
}

module.exports.logUserOut = (_, res) => {
  res.cookie('jwt', undefined, {
    maxAge: Date.now()
  })
  return res.redirect('/login');
}

module.exports.protect = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.redirect('/login');
  jwt.verify(token, process.env.SECRUT, (err, _) => {
    if (err)
      return res.redirect('/login');
    else
      next();
  });
}
