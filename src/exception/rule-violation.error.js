'use strict';

class RuleViolationError {

    constructor(message, status, code = 'CODE_ERR') {
        this.message = message;
        this.status = status || 401;
        this.code = code
    }
}

module.exports = RuleViolationError;