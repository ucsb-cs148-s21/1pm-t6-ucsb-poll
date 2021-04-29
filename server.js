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


//add new vote
app.post("/api/addVote", (req, res) => {
  console.log("Server requested to vote on poll");
  console.log("request: ", req.body);

  //TODO: Update profile information to show that the user has now voted. 

  if (req.body.option === 0) {
    db.collection("polls").doc(req.body.pollID).update({
      "option0" : firebase.firestore.FieldValue.increment(1)
    })
  }

  else if (req.body.option === 1) {
    db.collection("polls").doc(req.body.pollID).update({
      "option1" : firebase.firestore.FieldValue.increment(1)
    })
  }

  else if (req.body.option === 2) {
    db.collection("polls").doc(req.body.pollID).update({
      "option2" : firebase.firestore.FieldValue.increment(1)
    })
  }

  else if (req.body.option === 3) {
    db.collection("polls").doc(req.body.pollID).update({
      "option3" : firebase.firestore.FieldValue.increment(1)
    })
  }

  res.send()

});


//add new poll 
// TODO: update for new options structure
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
app.get('/getPoll/:pollID', (req, res) => {
  console.log("Client has requested server to get a poll.");
  var pollDoc = db.collection("polls").doc(req.params.pollID);

  pollDoc.get().then((doc) => {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        res.send(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such poll with id " + req.params.pollID);
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});





// get popular polls for homepage
app.get('/api/getPopularPollInformation', (req, res) => {
  console.log("Client has requested server to get popular poll information.");
  const qpo=[];
  const apo=[];
  const dpo=[];
  db.collection("polls").orderBy("attend").limit(6).get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        qpo.push(JSON.stringify(`${doc.data().question}`));
        if(`${doc.data().answerable}`=='false'){
          apo.push('(close)')
        }else{
          apo.push('(open)')
        }
        let today=new Date();
        dpo.push(`${((today-doc.data().date.toDate())/(1000*60*60*24)).toFixed(0)}`);
      });
      // console.log("Lists: " );
      // console.log(qpo);
      // console.log(apo, dpo);
      const nestedArray = [];
      nestedArray.push(qpo);
      nestedArray.push(apo);
      nestedArray.push(dpo);
      //console.log("arr: ", nestedArray);
      res.json(nestedArray);
    });
});

// get recent polls for home page
app.get('/api/getRecentPollInformation', (req, res) => {
  console.log("Client has requested server to get recent poll information.");
  const qpo=[];
  const apo=[];
  const dpo=[];
  db.collection("polls").orderBy("date","desc").limit(6).get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        qpo.push(JSON.stringify(`${doc.data().question}`));
        if(`${doc.data().answerable}`=='false'){
          apo.push('(close)')
        }else{
          apo.push('(open)')
        }
        let today=new Date();
        dpo.push(`${((today-doc.data().date.toDate())/(1000*60*60*24)).toFixed(0)}`);
      });
      // console.log("Lists: " );
      // console.log(qpo);
      // console.log(apo, dpo);
      const nestedArray = [];
      nestedArray.push(qpo);
      nestedArray.push(apo);
      nestedArray.push(dpo);
      //console.log("arr: ", nestedArray);
      res.json(nestedArray);
    });
});





