

const User = require("../models/User.js");
const passwordValidator = require("password-validator");
const passwordValidatorSchema = new passwordValidator();

class UserController {

	async userSignUp(req, res) {
        const { userName, password, instrument, admin } = req.body
        passwordValidatorSchema.has().not().spaces().is().min(8);
        
        // const saltRounds = 10;
        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hashedPassword = bcrypt.hashSync(newPassword, salt);
		try {
            if (!passwordValidatorSchema.validate(password))throw "the password should be minimum of 8 characters!";
            let newUser = new User({ userName, password, instrument, admin });
            newUser.save()
            res.sendStatus(200);
            
		} catch (error) {
			res.sendStatus(400);
		}
	}

    async adminSignUp(req, res) {
        const { userName, password, admin } = req.body
        passwordValidatorSchema.has().not().spaces().is().min(8);
        
        if (!passwordValidatorSchema.validate(password))throw "the password should be minimum of 8 characters!";
        // const saltRounds = 10;
        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hashedPassword = bcrypt.hashSync(newPassword, salt);
		try {
            let newAdmin = new User({ userName, password, admin });
            newAdmin.save()
            res.sendStatus(200);
            
		} catch (error) {
			res.sendStatus(400);
		}
	}

    async login(req, res) {
        const { userName, password } = req.body
        let user = await User.findOne({ userName: userName }) 
        
		try {
            if(!user){
                throw "User name not found!"
            }
            if( user.password == password ){
                res.send(user).sendStatus(200);
            }
            throw "invalid password"
            
		} catch (error) {
            if(error == "invalid password"){
                res.sendStatus(403);
            }

            if(error == "User name not found!"){
                return res.sendStatus(404)
            }

			if(error == "Bad Request"){
                res.sendStatus(400);
            }
           
		}
	}

}

const userController = new UserController()
module.exports = userController
