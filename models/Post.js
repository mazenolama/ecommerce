const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    title:{ required: true, type:String },
    description:{ required: true, type:String},
    createAt:{ type:Date, default:Date.now}
})

module.exports = Post = mongoose.model('Post', postschema)