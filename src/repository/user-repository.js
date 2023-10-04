const { User } = require("../models/index");

class UserRepository {
    async create(data) {
        try {
            // console.log('repo', data);
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Somethiing went wrong in repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                id: userId,
                },
            });
            return true;
        } catch (error) {
            console.log("Somethiing went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
