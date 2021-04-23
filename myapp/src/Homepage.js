
//not a working one right now, just for my team to view
/*
const db=firebase.database().ref();
const pools=db.child('pools');
const sortbydate=pools.oderByChild('date').limitToFirst(6);
const sortbypop=pools.oderByChild('participants').limitToFirst(6);

sortbydate.once('value',snap => console.log(snap.val()))
*/
/*
<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
var db = new Firebase('https://ucsb-polls.firebaseIO.com/');
<div id='messagesDiv'></div>
db.on('value', function(snapshot) {
	var message = snapshot.val();
	displayMessage(message.answerable, message.date, message.question);
});
function displayMessage(answerable, daye, question) {
    $('#messagesDiv').append('<div>answerable:'+answerable+',date:'+date+',question:'+question+'</div>');
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
*/
/*
<script src="/__/firebase/5.5.7/firebase-app.js"></script>
<script src="/__/firebase/5.5.7/firebase-auth.js"></script>
<script src="/__/firebase/5.5.7/firebase-database.js"></script>

https://console.firebase.google.com/project/ucsb-polls/firestore/data~2Fpolls?hl=zh-cn

<script src="/__/firebase/init.js"></script>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  */
var firebaseConfig = {
	apiKey: "AIzaSyCmZ272B89syKA0FNLa7ujYHvfI60YB2M0",
   	authDomain: "ucsb-polls.firebaseapp.com",
    	projectId: "ucsb-polls",
    	storageBucket: "ucsb-polls.appspot.com",
    	messagingSenderId: "989606767140",
    	appId: "1:989606767140:web:cf485612653f0ba2a186b1",
    	measurementId: "G-0HG55T6LG9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database=firebase.database();
database.ref('/').once('value', function(snapshot){
  console.log(snapshot.val());
});

//var rootRef=database().ref();
var rootRef = database.ref('/');
rootRef.once('value', function(snapshot){
  console.log(snapshot.val());
});
poolDataRef = database.ref("/pools");
//const pools=db.child('pools');
database.ref('/pools').once('value', function(snapshot){
  snapshot.forEach(function(data){
    console.log("Below are the child keys of the values in 'pools'")
    console.log(data.key);
  });
  console.log(Object.keys(snapshot.val()));
});
