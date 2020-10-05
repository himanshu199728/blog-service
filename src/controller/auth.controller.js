'use strict';
const BaseController = require('./base.controller');
const AuthManager = require('../biz/auth.manager');

class AuthController extends BaseController {

    constructor() { super() }

    async signUp(req, res) {
        try {
            const authManager = new AuthManager();
            const result = await authManager.signUp(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async login(req, res) {
        try {
            const authManager = new AuthManager();
            const result = await authManager.login(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async logout() {
        try {
            const authManager = new AuthManager();
            const result = await authManager.logout(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }
}

module.exports = AuthController;