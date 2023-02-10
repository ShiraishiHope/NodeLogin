const express = require ('express');
const bodyParser= require("body-parser");
const app = express()
const route = require("./router")
const dotenv = require("dotenv")



dotenv.config();

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use("/", route);

app.listen(8080, () => {console.log("Express is running on port: 8080")})
