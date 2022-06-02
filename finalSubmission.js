let http = require('http');
let path = require("path");
let express = require("express"); /* Accessing express module */
let app = express(); /* app is a request handler function */
let bodyParser = require("body-parser");
require("dotenv").config({ path: path.resolve(__dirname, 'credentials/.env') })
process.stdin.setEncoding("utf8");
app.use(express.static(__dirname));

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGO_DB_NAME;
const collectionName = process.env.MONGO_COLLECTION;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${userName}:${password}@cluster0.7hqzy.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

app.get("/", function (request, response) {
  response.render("index");
});

app.get("/addEmployee", function (request,response){
  response.render("addHire");
});


app.post("/addEmployee", function (request,response){
  response.render("addHire");
});

app.post('/addTask', function(request, response){
  response.render("addTask");
})

let portNumber = process.argv[2];
console.log(`Web server started and running at http://localhost:${portNumber}`);
http.createServer(app).listen(portNumber)
