
//not a working one right now, just for my team to view
/*
const db=firebase.database().ref();
const pools=db.child('pools');
const sortbydate=pools.oderByChild('date').limitToFirst(6);
const sortbypop=pools.oderByChild('participants').limitToFirst(6);

sortbydate.once('value',snap => console.log(snap.val()))
*/
    
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
