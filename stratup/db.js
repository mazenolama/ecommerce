const mongoose = require('mongoose')

module.exports = () => {
    const dbUrl = 'mongodb://localhost:27017/ecommerce';
    mongoose.connect(dbUrl).catch((err) => {console.log('DB Not Connected. ' + err);})
}
//mongodb://localhost:27017/ecommerce
//mongodb+srv://blog:mezo0000@cluster0.0jyncge.mongodb.net/blog-project?retryWrites=true&w=majority