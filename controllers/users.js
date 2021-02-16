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

    // update a user
    app.put('/users/:id', jsonParser, (req, res) => {
        User.findById(req.params.id, 'name email', function (error, user) {
            if (error) { console.error(error); }
            user.name = req.body.name
            user.email = req.body.email
            user.save(function (error, user) {
                if (error) { console.log(error); }
                res.send(user)
            })
        })
    })

    // delete a user
    app.delete('/users/:id',jsonParser, (req, res) => {
        User.remove({
            _id: req.params.id
        }, function (error, user) {
            if (error) { console.error(error); }
            res.send({ success: true })
        })
    })
}