// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function(req, res) {
  let output = {};
  let input = req.params.date_string;
  if (input) {
    let date;

    //if input contains only numerals, convert it to a number before passing it to the Date constructor
    if (!input.match(/\D/)) {
      date = new Date(Number.parseInt(input));
    }
    else {
      date = new Date(input);
    }

    if (date.toUTCString() !== "Invalid Date") {
      output = {
        unix: date.getTime(),
        utc: date.toUTCString()
      }
    }
    else {
      output = {
        error: "Invalid Date"
      }
    }
  }
  else {
    output = {
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    }
  }

  res.json(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});