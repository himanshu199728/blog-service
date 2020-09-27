'use strict';
const { HEADER, STATUS } = require('../constant');
const ErrorManger = require('../biz/error.manager');

class BaseController {

    constructor() { }
    ok(res, result) {
        res.status(STATUS.OK)
            .header(HEADER.CONTENT_TYPE, HEADER.JSON)
            .send(JSON.stringify(result));
    }

    error(res, error) {
        res.status(STATUS.ERROR)
            .header(HEADER.CONTENT_TYPE)
            .send(ErrorManger.get(error));
    }
}

module.exports = BaseController;