const TWEET = require("../services/db.service").addTweet;
const axios = require('axios').default;

/** Add Tweet
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {*} 
 */

exports.postTweet = async (req,res) => {
    try{
        let point = {
            type: 'Point',
            coordinates: [req.body.lon, req.body.lat],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
        }

        await TWEET.create({
            userId : req.user.id,
            tweet: req.body.tweet,
            position : point
        });

        return res.send(201).send({
            status : "Sucess",
            message : `Tweet: ${req.body.tweet} is successfully tweeted by user: ${req.user.emailId}`
        })
    }
    catch(e){
        return res.status(500).send({
            status: "Failed",
            message: "Server Side Error",
          });
    }
}
    
/** Get Nearby Tweets
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {*} 
*/

exports.getTweet = async (req,res) => {
    try{
        var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
        //latitude and longitude validation
        if(!reg.exec(req.query.lat) || !reg.exec(req.query.lon)){
            return res.status(400).send({
                status : "Failed",
                message : "Bad Input"
            })
        }
        let size = parseInt(req.query['pagesize']);
        let startIndex = (parseInt(req.query['pagenumber'])-1)*size;

        let data = await TWEET.findAndCountAll({
            where: Sequelize.where(Sequelize.fn('ST_DWithin',Sequelize.col('position'),Sequelize.fn('ST_SetSRID',Sequelize.fn('ST_MakePoint',req.query.lon, req.query.lat),4326),0.032),true),
            offset : startIndex,
            limit : size,
        });
        return res.status(200).send({
            status : "Success",
            message : "Tweets from nearby locations",
            data : data.rows,
            noOfPages : parseInt(data.count/size) + (data.count%size > 0 ?1:0)
        })
    }
    catch(e){
        return res.status(500).send({
            status: "Failed",
            message: "Server Side Error",
          });
    }
}

/** Api to get Weather 
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {*} 
*/
exports.getWeather = async (req,res) => {
    try{
        let data = axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=f60e194dfe952ee4ddb833606a707267`,
          });
        return res.status(200).send({
            status : "Success",
            message : "Weather data",
            data : data
        })
    }   
    catch(e){
        return res.status(500).send({
            status: "Failed",
            message: "Server Side Error",
        });
    }
}