const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const AppError = require('../utils/error-handler');

class UserService {

    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            // console.log('service', data);
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            // console.log('service error', error.name);
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log('Something went wrong in service layer');
            throw error;
        }
    }

    async signIn(email, plainPasword){
        try {
            // step 1 => fetch the user using the email
            const user = await this.userRepository.getByEmail(email); // this will return id email & password
            //step 2 => comapare incoming password with stored encrypted password
            const passwordMatch = await this.checkPassword(plainPasword, user.password);

            if(!passwordMatch){
                console.log('password does not match');
                throw{ error : 'incorrect password'};
            }

            // step 3 => if password matches then create a token and send it to the user
            const newJwt = this.createToken({email : user.email, id : user.id});
            return newJwt;
        } catch (error) {

            if(error.name == 'AttributeNotFound'){
                throw error;
            }
            console.log('Something went wrong in signin  process');
            throw error;   
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error : 'invalid token'};
            }

            const user = await this.userRepository.getById(response.id);
            
            if(!user){
                throw {error : 'No user with corresponding token exist'};
            }

            return user.id;
        } catch (error) {
            console.log('Something went wrong in auth  process');
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn : '1d'});
            return result;
        } catch (error) {
            console.log('something went wrong in token creation');
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log('something went wrong in token validation', error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password comparison', error);
            throw error;
        }
    }


    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log('Something went wrong in service layer');
            throw error;
        }
         
    }
}

module.exports = UserService;