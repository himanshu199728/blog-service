'use strict';
const BaseManager = require('./base.manager');

class ErrorManager extends BaseManager {
    constructor(async_param) {
        super(async_param);
    }

    static get(msg) {
        if (!msg) {
            throw new Error('msg argument is require to set error.');
        }
        const result = {
            message: msg.message || msg
        };
        if (typeof msg === "object" && msg.name === "ValidationError" &&
            Object.keys(msg.errors).length > 0) {
            result.errors = msg.errors;
        }
        return result;
    }
}

module.exports = ErrorManager;
