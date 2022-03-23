module.exports = (sequelize,Sequelize) =>{
    const User = sequelize.define('User',{
        emailId : Sequelize.STRING(50),
        password : Sequelize.STRING(200),
    });

    return User;
}