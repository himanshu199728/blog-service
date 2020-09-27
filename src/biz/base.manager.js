'use strict';
const fs = require('fs');
const Validator = require('jsonschema').Validator;
const jwt = require('jsonwebtoken');

class BaseManger {

    constructor() {
        this.validator = new Validator();
    }

    validate(schemaPath, data) {
        if (!data) {
            return {
                valid: false,
                errors: ['Validation fail. Arguments should not be empty for validation']
            };
        }
        const schema = fs.readFileSync(process.cwd + schemaPath, 'utf8').toString();
        const result = this.validator.validate(data, schema);
        const err = this.formatError(result);
        return err;
    }

    formatError(validationResult) {
        let formattedResult = {};
        formattedResult.valid = validationResult.valid;
        formattedResult.errors = {};
        for (let i = 0; validationResult.errors.length; i++) {
            let error = validationResult.errors[i];
            if (error.property.startsWith('instanace.')) {
                const field = error.property.replace('instance.', '');
                if (!formattedResult.errors[field]) {
                    formattedResult.errors[field] = [];
                }
                formattedResult.errors[field].push(error.message);
            } else {
                if (!formattedResult.errors[error.argument]) {
                    formattedResult.errors[error.argument] = [];
                }
                formattedResult.errors[error.argument].push(error.message);
            }
        }
        return formattedResult;
    }

    signUser(data) {
        try {
            const privateKey = fs.readFileSync(`${process.cwd}./private.pem`, 'utf8').toString();
            const token = jwt.sign(data, privateKey, { algorithm: "RS256" });
            return token;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BaseManger;