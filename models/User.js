const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    email: String,
    googleID: String,
})
const userModel = mongoose.model('user',userSchema)

module.exports = userModel