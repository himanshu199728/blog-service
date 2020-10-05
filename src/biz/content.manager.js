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

    async findAll(req) {
        try {
            const contents = Contents.find({}).populate({
                path: 'comments',
                populate: {
                    path: 'commenter',
                    model: 'Users'
                }
            }).exec();
            return contents;
        } catch (error) {
            throw error;
        }
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
                content.is_deleted = true;

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

    async deleteOne(req) {
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

    async comment(req) {
        try {
            const contentId = req.params.id;
            const comment = {};
            comment.id = v4();
            comment.content_id = contentId;
            comment.body = req.body.body;

            const user = await Users.findOne({ id: req.body.commenter_id }).exec();
            comment.commenter = user;

            comment = await Comments.create(comment);
            await Contents.findByIdAndUpdate({ id: contentId }, {
                $push: {
                    comments: comment
                }
            }).exec();
            return comment;
        } catch (error) {
            throw error;
        }
    }

    async upVote(req) {
        try {
            const contentId = req.params.id;
            // User who upvoting
            const commenterId = req.body.commenter_id;
            await Contents.findByIdAndUpdate({ id: contentId }, {
                $pull: {
                    votes: commenterId
                },
                $push: {
                    votes: commenterId
                }
            }).exec();
            const content = await Contents.findOne({ id: contentId }).populate({
                path: 'comments',
                populate: {
                    path: 'commenter',
                    model: 'Users'
                }
            }).exec();
            return exec();
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ContentManager;
