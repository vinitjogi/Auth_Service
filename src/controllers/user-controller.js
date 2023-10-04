const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req,res) => {

    try {
        // console.log('controller', req.body);
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            success : true,
            message : 'successfully created new user',
            data : response,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'cannot create user',
            success : false,
            data : {},
            err : error
        })
    }
}

module.exports = {
    create,
}