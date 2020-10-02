'use strict';
const BaseManager = require('./base.manager');
const { SCHEMA, MSG, STATUS, DEFAULT } = require('../constant');
const { ValidationError, RuleViolationError } = require('../exception');
const UsersModel = require('../models/users.model');
const { v4 } = require('uuid');
const Token = require('../utils/token');
const TOKEN_EXPIRY = 24 * 3600 // 1 day
class AuthManager extends BaseManager {

    constructor() { super(); }

    async signUp(data) {
        try {
            const validationResult = super.validate(SCHEMA.USER_AUTH, data);
            if (validationResult.valid) {
                const emailId = data.email_id;
                const secretCode = data.password;
                let user;
                user = await UsersModel.findOne({ email: data.email_id, is_deleted: false });
                if (user) {
                    throw new RuleViolationError(MSG.USER_ALREADY_EXIST + emailId);
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
                userData.token = null;
                user = await UsersModel.create(userData);

                return {
                    success: true,
                    data: { user: { id: userData.id, email: emailId } }
                };
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors, STATUS.UNAUTHORIZED)
        } catch (err) {
            throw err;
        }
    }

    async login(data) {
        try {
            const validationResult = super.validate(SCHEMA.USER_AUTH, data);
            if (validationResult.valid) {
                const emailId = data.body.email_id;
                const secretCode = data.body.password;
                const user = await UsersModel.findOne({ email: data.email_id, is_deleted: false }).exec();
                if (!user) {
                    throw new RuleViolationError(MSG.USER_NOT_FOUND + emailId);
                }

                const expiry = Math.round(new Date().getTime() / 1000) + TOKEN_EXPIRY;
                const dataToSign = {
                    id: emailId,
                    code: secretCode,
                    iat: expiry,
                    audience: DEFAULT.BLOG_SERVICE,
                    issuer: DEFAULT.BLOG_APP
                };
                const token = super.signUser(dataToSign);
                const password = Buffer.from(user.password, 'base64').toString('utf8');
                if (password != secretCode) {
                    throw new RuleViolationError(MSG.PASSWORD_NOT_MATCH)
                }
                user.token = token;
                user.save();

                return {
                    success: true,
                    access_token: token,
                    data: { user: { id: user.id, email: emailId } }
                };
            }
            throw new ValidationError(MSG.VALIDATION_ERROR, validationResult.errors, STATUS.UNAUTHORIZED);
        } catch (error) {
            throw error;
        }
    }

    async logout(req) {
        try {
            const emailId = req.identity.emailId;
            const options = { new: true };
            await UsersModel.findOneAndUpdate(
                { email_id: emailId, is_deleted: 0 },
                { $set: { token: null } }
                , options)
                .exec();

            return {
                sucess: true,
                message: 'Successfully logout'
            };

        } catch (error) {
            throw error;
        }
    }

}

module.exports = AuthManager;