'use strict';
const BaseManager = require('./base.manager');
const { SCHEMA, MSG, STATUS } = require('../constant');
const ValidationError = require('../exception/validation.error');
const UsersModel = require('../models/users.model');
const { v4 } = require('uuid');
const TOKEN_EXPIRY = 24 * 3600 // 1 day
class AuthManager extends BaseManager {

    constructor() { super() }

    async signUp(data) {
        try {
            const validationResult = super.validate(SCHEMA.USER_AUTH, data);
            if (validationResult.valid) {
                const emailId = data.email_id;
                const secretCode = data.password;
                let user;
                const expiry = Math.round(new Date().getTime() / 1000) + TOKEN_EXPIRY;
                const dataToSign = {
                    id: emailId,
                    code: secretCode,
                    iat: expiry,
                    audience: 'blog-service',
                    issuer: 'blog-app'
                };
                const token = super.signUser(dataToSign);
                user = await UsersModel.findOne({ email: data.email_id, is_deleted: false });
                if (user) {
                    throw new RuleViolationError(MSG.USER_ALREADY_EXIST);
                }

                const userData = {};
                userData.id = v4();
                userData.email = emailId;
                userData.password = Buffer.from(secretCode, 'utf8').toString('base64');
                userData.age = data.age || -1;
                userData.name = data.name || 'User';
                userData.is_deleted = false;
                userData.badge = {
                    bronze: false,
                    silver: false,
                    gold: false,
                    diamond: false,
                    supreme: false
                };
                user = await UsersModel.create(userData);

                return {
                    success: true,
                    access_token: token,
                    expiry,
                    data: { user: { id: userData.id, email: emailId } }
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