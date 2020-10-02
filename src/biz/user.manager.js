'use strict';
const { Users } = require('../models');
const BaseManager = require('./base.manager');
const DEFAULT_FIELD = 'id email name age bio badge';

class UserManager extends BaseManager {

    constructor() { super() }

    async findOne(req) {
        try {
            const id = req.params.id;
            const emailId = req.query.email_id;
            const user = await Users.findOne(
                {
                    $or: [
                        { id }, { email_id: emailId }
                    ]
                })
                .select(DEFAULT_FIELD)
                .exec();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateOne(req) {
        try {
            const id = req.params.id;
            const args = {};
            if (req.body.name) {
                args.name = req.body.name;
            }
            if (req.body.age) {
                args.age = req.body.age;
            }
            if (req.body.bio) {
                args.bio = req.body.bio;
            }
            const user = await Users.findOneAndUpdate({ id }, args, { new: true }).exec();
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserManager;