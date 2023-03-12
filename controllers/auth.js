const userDB = require('../models/user')
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req, res) => {
  
  const user = await userDB.create({ ...req.body })
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({user: {name: user.name} ,token })
}

const login = async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
      throw new BadRequestError('please provide an email and password')
    }
    const user = await userDB.findOne({email})
    
    if(!user){
      throw new UnauthenticatedError('invalid credentials')
    }
    const isPassword = await user.createPassword(password)
    if(!isPassword){
      throw new UnauthenticatedError('invalid credentials')
    }
    const token = user.createJWT();
    //console.log(email, password, user)
    res.status(StatusCodes.OK).json({user: {name: user.name} ,token })
  }

module.exports ={
    register,
    login
}  