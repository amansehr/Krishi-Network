const jwt = require("jsonwebtoken");
const userModel = require("../services/db.service").User;
const bcrypt = require("bcrypt");

require("dotenv").config();

const generateToken = (data, res) => {
  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);

  return res.send({
    msg: "Login Successful",
    token: token,
  });
};

module.exports.login = (req, res) => {
  userModel
    .findOne({
      where: {
        emailId: req.body.emailId,
      },
    })
    .then((data) => {

        if (data.length == 0) {
        return res.send({
          msg: "Please SignUp",
        });
      } else if (data["dataValues"].password == null) {
        return res.send({
          msg: "Please Reset your Password",
        });
      }
      if (bcrypt.compareSync(req.body.password, data.password)) {
        return generateToken(data, res);
      }
      return res.send({
        msg: "Password Incorrect",
      });
    })
    .catch((err) => {
      console.log("Error in login controller", err);
      res.send({
        msg: "Not Able to login",
      });
    });
};

module.exports.signUpEmailPassword = (req,res) => {
    userModel.findAll({
        where : {
            emailId : req.body.emailId
        }
    }).then(data => {
        if(data.length == 0){
            const hash = bcrypt.hashSync(req.body.password,10);
            userModel.create({ 
                emailId:req.body.emailId,
                password:hash
            }).catch(err => console.log("Error in signup controller",err))

            return res.status(201).send({
                status: "Success",
                message: "User Signed Up Successfully"
            })
        }
        return res.send({
            status : "Failed",
            message : "user already exist"

        })
    }).catch(err => console.log("Error in signup controller",err))
}
