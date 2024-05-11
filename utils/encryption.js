const bcrypt = require('bcryptjs');
const config = require('../config');
const jsonwebtoken = require('jsonwebtoken');

const hashPasswordusingbcryptjs = (password) => {
    const { saltRounds } = config;
    
    try {
        const salt =  bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    } catch (error) {
        throw error;
    }
}

const comparePasswordusingbcryptjs = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const generateJWTToken = (payload) => {
    const { jwtSecret } = config;
    try {
        return jsonwebtoken.sign(payload, jwtSecret);
    } catch (error) {
        throw error;
    }
}

const verifyJWTToken = (token) => {
    const { jwtSecret } = config;
    try {
        return jsonwebtoken.verify(token, jwtSecret);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    hashPasswordusingbcryptjs,
    comparePasswordusingbcryptjs,
    generateJWTToken,
    verifyJWTToken
}