'use strict';
const ContentManager = require('../biz/content.manager');
const BaseController = require('./base.controller');

class ContentController extends BaseController {
    constructor() { super(); }

    async findAll(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.findAll(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async createOne(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.createOne(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async editOne(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.editOne(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async deleteOne(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.deleteOne(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async comment(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.comment(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }

    async upVote(req, res) {
        try {
            const contentManager = new ContentManager();
            const result = await contentManager.upVote(req);
            super.ok(res, result);
        } catch (err) {
            super.error(res, err);
        }
    }
}

module.exports = ContentController;