require("dotenv").config();
const express = require("express");
const db = require("./services/db.service");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();
//db.sequelize.sync({force : true});

const PORT = process.env.PORT || 8081; 

//start the server
app.listen(PORT,console.log(`server started in ${process.env.NODE_ENV} mode at port ${PORT}`));
app.get('/',(req,res) => res.send({data : 1}))

//routes
const auth = require("./routes/auth.routes");
app.use('/',auth);
const Tweet = require("./routes/Tweets.route");
app.use('/',Tweet);