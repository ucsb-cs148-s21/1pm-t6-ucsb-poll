const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");


// Firebase App (the core Firebase SDK)
var firebase = require("firebase/app");
require("firebase/firestore");

//require("firebase/auth");
//const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyCmZ272B89syKA0FNLa7ujYHvfI60YB2M0",
  authDomain: "ucsb-polls.firebaseapp.com",
  projectId: "ucsb-polls",
  storageBucket: "ucsb-polls.appspot.com",
  messagingSenderId: "989606767140",
  appId: "1:989606767140:web:cf485612653f0ba2a186b1",
  measurementId: "G-0HG55T6LG9"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'myapp/build')));

app.get("/", function (req, res) {
  res.render("index.html");
});

// why does it say this is deprecated??? Only started working after I added this line
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));


//

// BEGIN REQUESTS

//


//adds new user
app.post("/addNewUser", (req, res) => {
  console.log("Server requested to add new user to DB");
  console.log("request: ", req.body);

  db.collection("users").doc(req.body.email).set({
    name: req.body.name,
    email: req.body.email,
    //id: req.body.id,
    num: 53,
    role: "admin",
    }, {merge: true})
    .then(function () {
      console.log("Doc Succesfully Written");
    })
    .catch(function (error) {
      console.error("Error caught: ", error);
    });
});

// get user information 
app.get('/api/getUser/:userID', (req, res) => {
  console.log("Client has requested server to get user information.");
  var userdoc = db.collection("users").doc(req.params.userID);

  userdoc.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        res.send(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});


app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})


//add new poll
app.post("/addNewPoll", (req, res) => {
  console.log("Server requested to add new poll to DB");
  console.log("request: ", req.body);

  db.collection("polls").doc(req.body.id).set({
    name: req.body.name,
    answerable: req.body.answerable,
    date: firebase.firestore.Timestamp.fromDate(new Date("December 10, 2010")), 
    options: req.body.options,
    question: req.body.question,
    })
    .then(function () {
      console.log("Doc Succesfully Written");
    })
    .catch(function (error) {
      console.error("Error caught: ", error);
    });
});


// get poll 
app.get("/getPoll", (req, res) => {
  console.log("Client has requested server to get a poll.");
  var pollDoc = db.collection("polls").doc(req.header('pollID'));

  pollDoc.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        res.send(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});



