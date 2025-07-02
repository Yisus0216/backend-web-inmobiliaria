import jwt from 'jsonwebtoken'
import { config } from '../../config.js';


//Agremaos el payload de los useCase (Se le pasa el config.jwtExpired_in como default)
function generateToken(payload, expiresIn = config.jwtExpired_in){
    return jwt.sign(payload, config.jwSecret, {expiresIn})
}

//verificacion del token que recibe (un token)
function verifyToken(token){
    return jwt.verify(token, config.jwSecret)
}

export {
    generateToken,
    verifyToken
}