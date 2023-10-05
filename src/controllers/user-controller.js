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
        });
    }
}

const signIn = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success : true,
            message : 'successfully signed in',
            data : response,
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'something went wrong',
            success : false,
            data : {},
            err : error
        });
    }
}

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            err : {},
            data : response,
            message : 'user is authenticated and token is valid'
        });
    } catch (error) {
        return res.status(500).json({
            message : 'something went wrong',
            success : false,
            data : {},
            err : error
        });
    }
}

module.exports = {
    create, signIn, isAuthenticated
}