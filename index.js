// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp API Endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    let currentDate = new Date();
    return res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
  }

  // Check if the input is a valid Unix timestamp (all numbers)
  if (!isNaN(date)) {
    date = parseInt(date); // Convert string to integer
  }

  let parsedDate = new Date(date);

  // If the date is invalid, return an error
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return formatted timestamp response
  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
