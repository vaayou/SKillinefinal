//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
require('dotenv').config();

const app = express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const api=process.env.API;
console.log(api);



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  let jsonData = JSON.stringify(data);
  console.log(data);
  

  let options = {
    url: "https://us10.api.mailchimp.com/3.0/lists/5377c079ce", //5377c079ce
    method: "POST",
    headers: {
      "Authorization": "Pawan " + api ,
    },
    body: jsonData,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(3000 || process.env.PORT, function () {
  console.log("server is running on port 3000");
});


// 5377c079ce
