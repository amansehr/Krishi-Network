module.exports = (sequelize,Sequelize) =>{
    const Tweet = sequelize.define('Tweet',{
        userId: Sequelize.INTEGER,
        tweet : Sequelize.STRING(1000),
        position: Sequelize.GEOMETRY('POINT', 4326),
    });

    return Tweet;
}