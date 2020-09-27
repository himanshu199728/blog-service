'use strict';
const BaseController = require('./base.controller');
const AuthManager = require('../biz/auth.manager');

class AuthController extends BaseController {

    constructor() {
        this.authManager = new AuthManager();
    }

    async signUp(req, res) {
        try {
            const result = await this.authManager.signUp(req.body);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    login() {

    }

    logout() {

    }
}

module.exports = AuthController;