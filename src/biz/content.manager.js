'use strict';
const BaseManager = require('./base.manager');
const { v4 } = require('uuid');
const { Contents, Users, Comments } = require('../models');
const { MSG } = require('../constant');
const { ValidationError } = require('../exception');

class ContentManager extends BaseManager {

    constructor() {
        super();
    }

    async createOne(req) {
        try {
            const validationResult = super.validate(CONTENT_REQUEST, req.body)
            if (validationResult.valid) {
                let content = {};
                content.id = v4();
                content.title = req.body.title;
                content.editor_name = req.body.editor_name;
                content.body = req.body.body;
                content.editor_id = req.body.editor_id;

                await Contents.create(content);

                content = await Contents.findOne({ id: content.id }).exec();
                return content;
            }
            throw new ValidationError(MSG.VALIDATION_ERROR);
        } catch (error) {
            throw error;
        }
    }

    async editOne(req) {
        try {
            const id = req.params.id;
            let content = {};
            content.title = req.body.title;
            content.editor_name = req.body.editor_name;
            content.body = req.body.body;
            content.editor_id = req.body.editor_id;
            const contentEntity = await Contents.findOne({ id }).exec();
            Object.assign(contentEntity, content);

            await contentEntity.save();
            content = await Contents.findOne({ id }).exec();
            return content;
        } catch (error) {
            throw error;
        }
    }

    deleteOne(req) {
        try {
            const id = req.params.id;
            await Contents.deleteOne({ id }).exec();
            await Contents.deleteMany({ content_id: id }).exec();

            return {
                success: true,
                message: 'Content got deleted successfully'
            };
        } catch (error) {
            throw error;
        }
    }

    comment(req) {
        try {
            const contentId = req.params.id;
            const comment = {};
            comment.id = v4();
            comment.content_id = contentId;
            comment.body = req.body.body;

            const content = await Contents.findOne({ id: contentId }).exec();
            const user = await Users.findOne({ id: content.editor_id }).exec();
            comment.commenter = user;

            await Comments.create(comment);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    upVote(req) {
        try {

        } catch (error) {
            throw error;
        }
    }

}

module.exports = ContentManager;
