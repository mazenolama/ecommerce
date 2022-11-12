const mongoose= require("mongoose");

// 3 string SchemaTypes: 'name', 'nested.firstName', 'nested.lastName'
const userschema = new mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    username:{ required: true, type:String },
    email: { required: true, type:String },
    password:{ required: true,type : Array },
    phone:String,
    otp:String,
    token: String,
    status: { type : String, default: 'active'},
    role:{ type : String, default: 'user'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

module.exports = User = mongoose.model('User', userschema)