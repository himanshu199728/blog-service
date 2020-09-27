'use strict';
const AuthController = require('./auth.controller');
const UserController = require('./user.controller');
const ContentController = require('./content.controller');

function proxy(obj) {
    let handler = {
        get(target, propKey, receiver) {
            const origMethod = target[propKey];
            return function (...args) {
                return origMethod.apply(obj, args);
            };
        }
    }
    return new Proxy(obj, handler);
}

module.exports.authController = proxy(new AuthController());
module.exports.userController = proxy(new UserController());
module.exports.contentController = proxy(new ContentController());
module.exports.defaultController = (req, res) => {
    res.status(200).send('Service under construction...');
}