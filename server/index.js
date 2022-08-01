var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const e = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;


// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password/:account", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      const createPassword = req.params.password;
      bcrypt.hash(createPassword, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        dal.create(req.params.name, req.params.email, hash, req.params.account).then((user) => {
          console.log(user);
          res.send(user);
        });
      });
    }
  });
});

// login user
app.get("/account/login/:email/:password", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      let loginPassword = req.params.password;
      const userPassword = user[0].password;
      bcrypt.compare(loginPassword, user[0].password, function (err, result) {
        if (result === true) {
          res.send(user[0]);
        }else {
          res.send("Wrong password entered"+err);
        }
      });
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log("Running on port: " + PORT);
});
