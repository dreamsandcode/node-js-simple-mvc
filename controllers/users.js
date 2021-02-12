var User = require('../models/User');

module.exports.controller = (app) => {
    // get users page
    app.get('/users', (req, res) => {
        res.render('users', { title: 'Users', description: 'This is the description of all the users' });
    })

    app.post('/users/create', (req, res) => {
        const user_resource = new User({
            name: 'Brian Palmer',
            email: 'dreamsandcode@gmail.com'
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

    app.post('/users/findall', (req, res) => {

        User.find({}, 'name email', function (error, users) {
            if (error) { console.error(error); }
            res.send({
                users: users
            })
        })
    })

    app.post('/users/fineone', (req, res) => {
        User.findById(1, 'name email', function (error, user) {
            if (error) { console.error(error); }
            res.send(user)
        })
    })

    app.post('users/findandsave', (req, res) => {
        // 1 is the ID
        User.findById(1, 'name email', function (error, user) {
            if (error) { console.error(error); }
            user.name = 'Peter'
            user.email = 'peter@gmail.com'
            user.save(function (error) {
                if (error) {
                    console.log(error)
                }
                res.send({
                    success: true
                })
            })
        })
    })

    app.post('users/findoneandupdate', (req, res) => {
        // Update and return the user object
        User.findOneAndUpdate({ name: 'Peter' }, { $set: { name: "Sara" } },
            function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.send(user);
            });
    })

    app.post('users/findbyidandupdate', (req, res) => {
        User.findByIdAndUpdate(1, { $set: { name: "Sara" } }, function (err) {
            if (err, user) {
                console.log(err);
            }
            res.send(user);
        });
    })

    app.post('users/remove', (req, res) => {
        User.remove({
            _id: 1
        }, function (err) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    })

    app.post('users/findoneandremove', (req, res) => {
        // return the users object 
        // can be useful to show a message with the users properties such as name/email
        // "User with name {x} has been deleted"
        User.findOneAndRemove({
            _id: 1
        }, function (err, user) {
            if (err)
                res.send(err)
            res.send({
                success: true,
                user: user
            })
        })
    })

    app.post('users/findbyidandremove', (req, res) => {
        User.findByIdAndRemove(1, function (err) {
            if (err)
                res.send(err)
            res.send({
                success: true
            })
        })
    })
}