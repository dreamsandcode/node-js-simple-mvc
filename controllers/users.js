var User = require('../models/User');

module.exports.controller = (app) => {
    // get users page
    app.get('/users', (req, res) => {
        res.render('users', { title: 'Users', description: 'This is the description of all the users' });
    })

    app.post('/users/create', (req,res) => {
        const user_resource = new User({
            name: 'Brian Palmer',
            email: 'dreamsandcode@gmail.com'
        })

        user_resource.save((error) => {
            if(error)
                console.log(error);
            
            res.send({
                success: true,
                code: 200,
                msg: user_resource.name + ' was added' 
            })
        })
    })

    app.post('/users/find', (req,res) => {

        User.find({}, 'name email', function (error, users) {
            if (error) { console.error(error); }
            res.send({
                users: users
            })
        })
    })
}