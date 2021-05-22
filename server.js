const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");


// Firebase App (the core Firebase SDK)
var firebase = require("firebase/app");
require("firebase/firestore");

//require("firebase/auth");
//const admin = require("firebase-admin");


// COPY PASTE FIREBASE CONFIG HERE: 
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
    role: "member",
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


app.get('/api/getUserVote/:userID/voteHistory/:pollID', (req, res) => {
  console.log("Client has requested server to get user poll votes for poll : ", req.params.pollID);
  var userdoc = db.collection("users").doc(req.params.userID).collection("pollHistory").doc(req.params.pollID);

  userdoc.get().then((doc) => {
    if (doc.exists) {
        console.log("User Poll data:", doc.data());
        res.send(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});

app.get('/api/getUserVotingHistory/:userID', (req, res) => {
  console.log("Client has requested server to get user voting history : ", req.params.pollID);
  const pollID=[];
  const questions=[];
  //const date=[];
  //const option =[];
  db.collection("users").doc(req.params.userID).collection("pollHistory").get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        pollID.push((doc.id));
        questions.push((`${doc.data().question}`));

      });

      const nestedArray = [];
      nestedArray.push(pollID);
      nestedArray.push(questions);
      console.log("arr: ", nestedArray);
      res.json(nestedArray);
    });
});

//add new vote
app.post("/api/addVote", (req, res) => {
  console.log("Server requested to vote on poll");
  console.log("request: ", req.body);

  console.log("Server logging poll information to user")
  db.collection("users").doc(req.body.email).update({
    "voted" : firebase.firestore.FieldValue.arrayUnion((req.body.option.toString()+req.body.pollID)),
    "votedList": firebase.firestore.FieldValue.arrayUnion((req.body.pollID)),

  })

  db.collection("users").doc(req.body.email).collection("pollHistory").doc(req.body.pollID).set({
    option : req.body.option,
    date : new Date(),
    question: req.body.question,

  })


  db.collection("polls").doc(req.body.pollID).update({
    "personattend" : firebase.firestore.FieldValue.arrayUnion((req.body.option.toString()+req.body.email)),
  })

  if (req.body.option === 0) {
    db.collection("polls").doc(req.body.pollID).update({
      "option0" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)
    })
  }

  else if (req.body.option === 1) {
    db.collection("polls").doc(req.body.pollID).update({
      "option1" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  else if (req.body.option === 2) {
    db.collection("polls").doc(req.body.pollID).update({
      "option2" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  else if (req.body.option === 3) {
    db.collection("polls").doc(req.body.pollID).update({
      "option3" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  res.send()

});


//add new poll 
// TODO: update for new options structure
app.post("/addNewPoll", (req, res) => {
  console.log("Server requested to add new poll to DB");
  console.log("request: ", req.body);
  let today = new Date();
  db.collection("polls").doc().set({
    answerable: req.body.answerable,
    date: today, // change date to current date
    dueDate: req.body.date, 
    options: req.body.options, 
    question: req.body.question, 
    category: req.body.category, 
    option0: 0,
    option1: 0,
    option2: 0,
    option3: 0,
    attend: 0,
    
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
  //console.log("Client has requested server to get a poll.");
  var pollDoc = db.collection("polls").doc(req.params.pollID);

  pollDoc.get().then((doc) => {
    if (doc.exists) {
        res.send(doc.data())
    } else {
        console.log("No such poll with id " + req.params.pollID);
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});



// get popular polls for homepage
app.get('/api/getPopularPollInformation', (req, res) => {
  //console.log("Client has requested server to get popular poll information.");
  const qpo=[];
  const apo=[];
  const dpo=[];
  const idpo=[];
  db.collection("polls").orderBy("attend","desc").limit(6).get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idpo.push(JSON.stringify(doc.id));
        qpo.push(JSON.stringify(`${doc.data().question}`));
        let dateClosed = new Date(doc.data().dueDate);
        let today=new Date();
        let daysSinceClose = dateClosed - today
        dpo.push(`${((daysSinceClose)/(1000*60*60*24)).toFixed(0)}`);
      });
      const nestedArray = [];
      nestedArray.push(qpo);
      nestedArray.push(apo);
      nestedArray.push(dpo);
      nestedArray.push(idpo);
      //console.log("popular polls arr: ", nestedArray);
      res.json(nestedArray);
    });
});

// get recent polls for home page
app.get('/api/getRecentPollInformation', (req, res) => {
  //console.log("Client has requested server to get recent poll information.");
  const qpo=[];
  const apo=[];
  const dpo=[];
  const idpo=[];
  db.collection("polls").orderBy("date","desc").limit(6).get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idpo.push(JSON.stringify(doc.id)); //this is giving '".....fjaljf...."' as the result. Double quotation marks. 
        qpo.push(JSON.stringify(`${doc.data().question}`));
        let dateClosed = new Date(doc.data().dueDate);
        let today=new Date();
        let daysSinceClose = dateClosed - today
        dpo.push(`${((daysSinceClose)/(1000*60*60*24)).toFixed(0)}`);

      });
      const nestedArray = [];
      nestedArray.push(qpo);
      nestedArray.push(apo);
      nestedArray.push(dpo);
      nestedArray.push(idpo);
      //console.log("recent polls: ", nestedArray);
      res.json(nestedArray);
    });
});

app.get('/api/getPollInformation/:filter/:num', (req, res) => {
  //console.log("Client has requested server to get recent poll information.");
  //
  const qpo=[];
  const apo=[];
  const dpo=[];
  const idpo=[];
  var order = "";
  if (req.params.filter === "Popular") {
    order = "attend";
  }
  else {
    order = "date";
  }
  db.collection("polls").orderBy(order,"desc").limit(req.params.num).get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idpo.push(JSON.stringify(doc.id)); //this is giving '".....fjaljf...."' as the result. Double quotation marks. 
        qpo.push(JSON.stringify(`${doc.data().question}`));
        let dateClosed = new Date(doc.data().dueDate);
        let today=new Date();
        let daysSinceClose = dateClosed - today
        dpo.push(`${((daysSinceClose)/(1000*60*60*24)).toFixed(0)}`);
      });
      const nestedArray = [];
      nestedArray.push(qpo);
      nestedArray.push(apo);
      nestedArray.push(dpo);
      nestedArray.push(idpo);
      console.log("arr: ", nestedArray);
      res.json(nestedArray);
    });
});

//get all poll for search function
app.get('/api/getpollforsearch', (req, res) => {
  const allpoll=[];
  const idpo=[];
  var docRef = db.collection("polls");

// Valid options for source are 'server', 'cache', or
// 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
// for more information.
  var getOptions = {
    source: 'server'
  };

// Get a document, forcing the SDK to fetch from the offline cache.
  docRef.get(getOptions).then((querySnapshot) => {

  //db.collection("polls").get()
  //  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        idpo.push(JSON.stringify(doc.id));
        allpoll.push(JSON.stringify(`${doc.data().question}`));
      });
      const nestedArray = [];
      nestedArray.push(allpoll);
      nestedArray.push(idpo);
      res.json(nestedArray);
    });
});


