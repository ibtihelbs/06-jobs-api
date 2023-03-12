const userDB = require('../models/user')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError} = require('../errors')

const auth = async(req, res, next) =>{
  const authHeader =  req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('auth invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId: payload.userId, name: payload.name}
    next()
  } catch (error) {
    throw new UnauthenticatedError('auth invalid0.2')
  }
}

module.exports = auth;