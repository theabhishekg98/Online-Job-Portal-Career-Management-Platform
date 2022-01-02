const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const passport = require("passport");
const Constants = require('./utils/constants');
const C = new Constants();
var kamalRouter=require('./api/kamal/kamalRoutes');
var harshaRouter=require('./api/harsha/harshaRoutes');
const abhiramRouter = require('./api/abhiram/abhiramRoutes')
const evelynRouter = require('./api/evelyn/evelynRoute');
const ananyaRouter = require('./api/ananya/ananyaRoutes')
const abhishekRouter = require('./api/abhishek/abhishekRoutes');
const connection = require("./mongo");
var router = express.Router();
var bodyparser = require('body-parser')
app.use(passport.initialize());

const corsOptions = {
    origin: C.Client.URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(cors({ origin: C.Client.URL, credentials: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var home=router.get('/',(req,res)=>{
    res.status(200).send({"status":"Okay"})
})

app.use('/',home)
app.use('/k', kamalRouter)
app.use('/ha',harshaRouter)
app.use('/abhi',abhiramRouter)
app.use('/evelyn', evelynRouter);
app.use('/an',ananyaRouter)
app.use('/abhishek', abhishekRouter);

app.listen(C.Server.Port, () => {
    console.log(`Your server is running on port ${C.Server.Port}`);
});

