'use strict';
const BaseManager = require('./base.manager');
const { SCHEMA, MSG, STATUS } = require('../constant');
const ValidationError = require('../exception/validation.error');
const UserRepository = require('../repository/user.repository');
const uuid = require('uuid')
const TOKEN_EXPIRY = 24 * 3600 // 1 day
class AuthManager extends BaseManager {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const validationResult = super.validate(SCHEMA.USER_AUTH, data);
            if (validationResult.valid) {
                const emailId = data.email_id;
                const secretCode = data.password;
                const expiry = Math.round(new Date().getTime() / 1000) + TOKEN_EXPIRY;
                const dataToSign = {
                    id: emailId,
                    code: secretCode,
                    iat: expiry,
                    audience: 'blog-service',
                    issuer: 'blog-app'
                };
                const token = super.signUser(dataToSign);
                const user = await this.userRepository.findOne({ email: data.email_id, is_deleted: false });
                if (user) {
                    throw new RuleViolationError(MSG.USER_ALREADY_EXIST);
                }

                const userData = {};
                userData.id = uuid();
                user.email = emailId;
                user.password = Buffer.from(password, 'utf8').toString('base64');
                user.age = data.age || -1;
                user.name = data.name || 'User';
                user.is_deleted = false;
                user.badge = {
                    bronze: false,
                    silver: false,
                    gold: false,
                    diamond: false,
                    supreme: false
                };
                const user = await this.userRepository.create(userData);

                return {
                    success: true,
                    access_token: token,
                    expiry,
                    user: { id: userData.id, email: emailId }
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