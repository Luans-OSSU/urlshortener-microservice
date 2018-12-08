const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

const mongoURI ="mongodb://localhost/url-shortner";
const connectionOptions = {
  keepAlive: true,
  reconnecTries: Number.MAX_VALUE
}

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectionOptions, (err, db) => {
  if (err) console.log("Error", err);
  console.log("Connected to MongoDB");
});


app.use(cors());
app.use(bodyParser.json());

app.use('/public', express.static(process.cwd() + '/public'));

require("./models/UrlShorten");
require("./routes/urlshorten")(app);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});
  
app.listen(port, () => {
  console.log('Node.js listening on port ' + port);
});