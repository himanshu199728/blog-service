'use strict';

const { MSG } = require("../constant");

class Token {

    constructor(accessToken) {
        if (accessToken) {
            this.token = accessToken.replace(/bearer\s/i, '');
            const parts = this.token.split('.');
            this.header = decode(parts[0]);
            this.content = decode(parts[1]);
            this.signature = decode(parts[2]);
            this.signed = `${parts[0]}.${parts[1]}`;
        }
    }

    isValid() {
        if (this.isExpired()) {
            throw new RuleViolationError(MSG.TOKEN_EXPIRED);
        }
    }

    isExpired() {
        return ((this.content.exp * 1000) < Date.now());
    }
}

module.exports = Token;

function decode(part) {
    return JSON.parse(Buffer.from(part, 'base64').toString());
}