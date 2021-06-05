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
  // console.log("Server requested to add new user to DB");
  // console.log("request: ", req.body);

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
  // console.log("Client has requested server to get user information.");
  var userdoc = db.collection("users").doc(req.params.userID);

  userdoc.get().then((doc) => {
    if (doc.exists) {
        res.send(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such user!");
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
        console.log("No such thing!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
});

//user voting history
app.get('/api/getUserVotingHistory/:userID', (req, res) => {
  console.log("Client has requested server to get user voting history : ", req.params.userID);
  const pollID=[];
  const questions=[];
  const date = [];
  //const date=[];
  //const option =[];
  db.collection("users").doc(req.params.userID).collection("pollHistory").orderBy("date","desc").get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        pollID.push((doc.id));
        questions.push((`${doc.data().question}`));
        date.push(doc.data().date.toDate());

      });

      const nestedArray = [];
      nestedArray.push(pollID);
      nestedArray.push(questions);
      nestedArray.push(date);

      console.log("arr: ", nestedArray);
      res.json(nestedArray);
    });
});

//user creation history
app.get('/api/getUserCreationHistory/:userID', (req, res) => {
  console.log("Client has requested server to get user creation history : ", req.params.userID);
  const pollID=[];
  const questions=[];
  const date = [];
  const category = [];

  db.collection("users").doc(req.params.userID).collection("creationHistory").orderBy("date","desc").get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        pollID.push((doc.id));
        questions.push((`${doc.data().question}`));
        date.push(doc.data().date.toDate());
        category.push(doc.data().category)
      });

      const nestedArray = [];
      nestedArray.push(pollID);
      nestedArray.push(questions);
      nestedArray.push(date);
      nestedArray.push(category);

      console.log("creation arr: ", nestedArray);
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

  else if (req.body.option === 4) {
    db.collection("polls").doc(req.body.pollID).update({
      "option4" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  else if (req.body.option === 5) {
    db.collection("polls").doc(req.body.pollID).update({
      "option5" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  else if (req.body.option === 6) {
    db.collection("polls").doc(req.body.pollID).update({
      "option6" : firebase.firestore.FieldValue.increment(1),
      "attend" :  firebase.firestore.FieldValue.increment(1)

    })
  }

  else if (req.body.option === 7) {
    db.collection("polls").doc(req.body.pollID).update({
      "option7" : firebase.firestore.FieldValue.increment(1),
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

  db.collection("polls").add({
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
    option4: 0,
    option5: 0,
    option6: 0,
    option7: 0,
    attend: 0,
    creator: req.body.name,
    email: req.body.email,
    
    })
    .then(function (docRef) {
      console.log("Doc Succesfully Written");
      console.log(req.body.email);
      db.collection("users").doc(req.body.email).collection("creationHistory").doc(docRef.id).set({
        question: req.body.question, 
        date : new Date(),
        category: req.body.category, 
      })
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
        console.log("Got poll: ", doc.data())
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

app.get('/api/getPollInformation/:filter/:num/:category', (req, res) => {
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

  if (req.params.category === "default") {
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
    }
  
    else {
      db.collection("polls").where("category", "==", req.params.category).orderBy(order,"desc").limit(req.params.num).get() 
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
    }
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




//
// COMMENT FUNCTIONS
//



app.post("/api/addComment", (req, res) => {
  console.log("Server requested to add new comment to DB");
  console.log("request: ", req.body);
  let today = new Date();
  db.collection("polls").doc(req.body.pollID).collection("comments").add({
    link : req.body.link,
    author : req.body.author,
    text : req.body.text,
    date : today,
    upvotes: 0, 
    })
    .then(function () {
      console.log("Doc Succesfully Written");
      res.send();
    })
    .catch(function (error) {
      console.error("Error caught: ", error);
    });
});

app.get('/api/getComments/:pollID/:filter', (req, res) => {
  //console.log("Client has requested server to get recent poll information.");
  //

  var order = "";
  if (req.params.filter === "Popular") {
    order = "upvotes";
  }
  else {
    order = "date";
  }

  const arrayOfComments = [];
  db.collection("polls").doc(req.params.pollID).collection("comments").orderBy(order,"desc").get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = [];
        data.push(doc.id);
        doc = doc.data();
        data.push(doc.link);
        data.push(doc.author);
        data.push(doc.date.toDate());
        data.push(doc.text);
        data.push(doc.upvotes);         

        arrayOfComments.push(data);

      });

      console.log("comments: ", arrayOfComments);
      res.json(arrayOfComments);
    });
});


app.post("/api/addReply", (req, res) => {
  console.log("Server requested to add new reply to DB");
  console.log("request: ", req.body);
  let today = new Date();
  db.collection("polls").doc(req.body.pollID).collection("comments").doc(req.body.commentID).collection("replies").add({
    link : req.body.link,
    author : req.body.author,
    date : today,
    text : req.body.text,
    upvotes: 0, 

    //the@info
    isReplytoReply: req.body.isReplytoReply,
    replyeeName : req.body.replyeeName,
    replyeeLink : req.body.replyeeLink,
    })
    .then(function () {
      console.log("Doc Succesfully Written");
      res.send();
    })
    .catch(function (error) {
      console.error("Error caught: ", error);
    });
});


app.get('/api/getReplies/:pollID/:commentID', (req, res) => {
  console.log("Client has requested server to get replies.");

  // var order = "";
  // if (req.params.filter === "Popular") {
  //   order = "upvotes";
  // }
  // else {
  //   order = "date";
  // }

  const nestedArray = [];

  db.collection("polls").doc(req.params.pollID).collection("comments").doc(req.params.commentID).collection("replies").orderBy("date").get() 
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = [];
        data.push(doc.id);
        doc = doc.data();
        data.push(doc.link);
        data.push(doc.author);
        data.push((doc.date.toDate()));
        data.push(doc.text);
        data.push(doc.upvotes);   

        data.push(doc.isReplytoReply);
        data.push(doc.replyeeLink);
        data.push(doc.replyeeName);
        nestedArray.push(data);     
      });
      console.log("replies: ", nestedArray);
      res.json(nestedArray);
    });
});


app.post("/api/upvoteComment", (req, res) => {
  console.log("Server requested to upvote");

  if (req.body.isReply) {
    db.collection("polls").doc(req.body.pollID).collection("comments").doc(req.body.commentID).collection("replies").doc(req.body.replyID).update({
      "upvotes" :  firebase.firestore.FieldValue.increment(req.body.vote)
    })
  }

  else {
    db.collection("polls").doc(req.body.pollID).collection("comments").doc(req.body.commentID).update({
      "upvotes" :  firebase.firestore.FieldValue.increment(req.body.vote)
    })
  }

  
  
});