const { Schema, model } = require('mongoose');

const ContentSchema = new Schema({
    id: { type: String, unique: true, index: true },
    title: { type: String, default: 'user' },
    editor_name: { type: Number, default: null, max: 150 },
    body: { type: String, default: 'Nothing to show' },
    views: { type: Integer, default: 0, validate: { validator: Number.isInteger } },
    comments: { type: [Schema.Types.ObjectId], ref: 'Comments', default: [] },
    editor_id: { type: String },
    is_deleted: { type: Boolean, default: false }
});

const Contents = model('Contents', ContentSchema);
module.exports = Contents;