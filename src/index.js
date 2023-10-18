const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const app = express();
// const UserService = require('./services/user-service');
// const userRepository = require('./repository/user-repository');
const db = require('./models/index');
const { User, Role } = require('./models/index');


const prepareAndStartServer = () =>{
    app.listen(PORT, async () => {

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));

        app.use('/authservice/api', apiRoutes);
        
        console.log(`Server Started On Port ${PORT}`);

        // const repo = new userRepository();
        // const response = await repo.getById('1');
        // console.log(response);

        // const service = new UserService();
        // const newToken = service.createToken({email : 'abc@gmail.com', id : 1});
        // console.log('new token is', newToken);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }

        // const u1 = await User.findByPk(9);
        // const r1 = await Role.findByPk(2);  

        // u1.addRole(r1);
    //     const response = await u1.getRoles();
    //     console.log(response);
    });
}

prepareAndStartServer();