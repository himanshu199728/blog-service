'use strict';

class BaseController {

    constructor() { }
    ok(res, result) {
        res.status(200)
            .header('Content-Type', 'Application/json')
            .send(JSON.stringify(result));
    }
}