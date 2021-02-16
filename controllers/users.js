var bodyParser = require('body-parser');

var User = require('../models/User');

var jsonParser = bodyParser.json()
 
module.exports.controller = (app) => {

    app.get('/users', (req, res) => {

        User.find({}, 'name email', function (error, users) {
            if (error) { console.error(error); }
            res.send({
                users: users
            })
        })
    })

    // get users page
    app.post('/users', jsonParser, (req, res) => {
        const user_resource = new User({
            name: req.body.name,
            email: req.body.email
        })
        user_resource.save((error) => {
            if (error)
                console.log(error);

            res.send({
                success: true,
                code: 200,
                msg: user_resource.name + ' was added'
            })
        })
    })
}