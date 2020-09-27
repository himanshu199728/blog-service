'use strict';
const BaseManager = require('./base.manager');
const { SCHEMA, MSG, STATUS } = require('../constant');
const ValidationError = require('../exception/validation.error');
const TOKEN_EXPIRY = 24 * 3600 // 1 day
class AuthManager extends BaseManager {

    signUp(data) {
        try {
            const validationResult = super.validate(SCHEMA.USER_AUTH, data);
            if (validationResult.valid) {
                const emailId = data.email_id;
                const secretCode = data.password;
                const expiry = Math.round(new Date().getTime() / 1000) + TOKEN_EXPIRY;
                const dataToSign = {
                    id: data.email_id,
                    code: data.password,
                    iat: expiry,
                    audience: 'blog-service',
                    issuer: 'blog-app'
                };
                const token = super.signUser(dataToSign);
                return {
                    success: true,
                    access_token: token,
                    expiry
                };
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors, STATUS.UNAUTHORIZED)
        } catch (err) {
            throw err;
        }
    }
    login() {

    }

    logout() {

    }

}

module.exports = AuthManager;