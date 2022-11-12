module.exports = app => {
    //app.use('', require('./posts'));
    app.use('', require('./user'))
    app.use('', require('../middlewares/auth'))
}