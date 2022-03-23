const express = require("express");
const router = express.Router();
const isauth = require("../middlewares/auth.middleware").auth;
const Joi = require("joi");
const validate = require("../middlewares/validate.middleware");
const Tweetctrl = require("../controllers/Tweet.controller");

const TweetData = Joi.object().keys({
  tweet: Joi.string().required().min(1).max(1000),
  lat: Joi.number().required(),
  lon : Joi.number().required()
});

router.post("/posttweet", [isauth,validate(TweetData)], Tweetctrl.postTweet);
router.get('/gettweet',[isauth],Tweetctrl.getTweet);
router.get('/getweather',[isauth],Tweetctrl.getWeather);

module.exports = router;