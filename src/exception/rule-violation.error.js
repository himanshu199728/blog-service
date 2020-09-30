'use strict';

class RuleViolationError {

    constructor(message, status) {
        this.message = message;
        this.status = status || 401;
    }
}