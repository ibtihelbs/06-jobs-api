const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)
  let customErrors = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'somthing went wrong try again'
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if(err.name == "ValidationError"){
     
  }
  if (err.code && err.code === 11000) {
    customErrors.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customErrors.statusCodes = 400
  }
  console.log(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  return res.status(customErrors.statusCodes).json({msg: customErrors.msg })
}

module.exports = errorHandlerMiddleware
