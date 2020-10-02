const { Schema, model } = require('mongoose')
const { Users } = require('.');

const CommentSchema = new Schema({
    id: { type: String, unique: true, index: true, required: true },
    content_id: { type: String, unique: false, required: true },
    commenter: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    body: { type: String, unique: false, required: true }
})

const Comments = model('Comments', CommentSchema);

module.exports = Comments;