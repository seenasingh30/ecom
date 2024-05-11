const encryption = require('../utils/encryption');
const response = require('../utils/response');
const message = require('../utils/message');

module.exports = (req, res, next) => {
    let token = req.cookies?.Authorization || req.headers?.Authorization;
    console.log(token);
    if (token) {
        try {
            const userData = encryption.verifyJWTToken(token);
            if (userData) {
                req.user = userData;
                console.log(userData);
                next();
            }
            else return response.sendBadRequest(res, message.user.notAuthorized);
        } catch (error) {
            res.clearCookie('auth_cookie');
            return response.sendBadRequest(res, message.user.invalidToken);
        }
    } else {
        return response.sendBadRequest(res, message.user.notAuthorized)
    }
}