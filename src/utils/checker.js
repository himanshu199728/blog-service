const Token = require('./token');
const { MSG, STATUS, HEADER } = require('../constant');
module.exports.checker = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(STATUS.UNAUTHORIZED)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(MSG.ACCESS_DENIED);
    }

    const token = new Token(authorization);

    req.identity = {
        emailId: token.content.email
    };
    // if(token.content.email){
    //     Users
    // }

    if (token.isValid()) {
        res.status(STATUS.UNAUTHORIZED)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(MSG.TOKEN_EXPIRED);
    }
    next();
};