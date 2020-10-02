'use strict';
const BaseController = require('./base.controller');
const UserManager = require('../biz/user.manager');

class UserController extends BaseController {

    constructor() { super(); }

    async findOne(req, res) {
        try {
            const userManager = new UserManager();
            const result = await userManager.findOne(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async updateOne(req, res) {
        try {
            const userManager = new UserManager();
            const result = await userManager.updateOne(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }
}

module.exports = UserController;