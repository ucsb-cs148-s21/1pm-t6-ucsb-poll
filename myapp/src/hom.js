import React, { Component } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { ThemeProvider } from 'react-bootstrap';

import useSWR from "swr";



<body>
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js">
</script>
<script src="https://www.gstatic.com/firebasejs/8.4.1/firebase-firestore.js">
</script>
</body>


var firebaseConfig = {
    apiKey: "AIzaSyCmZ272B89syKA0FNLa7ujYHvfI60YB2M0",
    authDomain: "ucsb-polls.firebaseapp.com",
    projectId: "ucsb-polls",
    storageBucket: "ucsb-polls.appspot.com",
    messagingSenderId: "989606767140",
    appId: "1:989606767140:web:cf485612653f0ba2a186b1",
    measurementId: "G-0HG55T6LG9"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
var db = firebase.firestore();


const initialList = [];
function checkbut(num){
  if(num=="(open)")
  {return (<a href="#" class="btn btn-primary">
    go to vote
  </a>)
  }
  if(num=="(close)"){
  return(
    <a href="#" class="btn btn-primary">
    view result
  </a>)}

}
function Poppoll(){
  const [qlist, setqList] = React.useState(initialList);
  const [alist, setaList] = React.useState(initialList);
  const [dlist, setdList] = React.useState(initialList);

  const fetcher = url => fetch(url)
    .then(res => (res.json()))
    .then(data => {
      console.log("data: ", data);
      setqList(data[0]);
      setaList(data[1]);
      setdList(data[2]);
    });
  const { data } = useSWR(
    '/api/getPopularPollInformation',
    fetcher
  );


  return (
    <div class="card">
          <div class="card-header">popular polls</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[0]}</h5>
                  {checkbut(alist[0])}
                </div>
                <div class="card-footer">
  <small class="text-muted">{dlist[0]}days ago{alist[0]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[1]}</h5>
                  {checkbut(alist[1])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[1]}days ago{alist[1]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[2]}</h5>
                  {checkbut(alist[2])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[2]}days ago{alist[2]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[3]}</h5>
                  {checkbut(alist[3])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[3]}days ago{alist[3]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[4]}</h5>
                  {checkbut(alist[4])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[4]}days ago{alist[4]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[5]}</h5>
                  {checkbut(alist[5])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[5]}days ago{alist[5]}</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">
              view all
            </a>
          </div>
        </div>
  );
}

function Repoll(){
  const [qlist, setqList] = React.useState(initialList);
  const qpo=[];
  const [alist, setaList] = React.useState(initialList);
  const apo=[];
  const [dlist, setdList] = React.useState(initialList);
  const dpo=[];
  db.collection("polls").orderBy("date","desc").limit(6).onSnapshot("value", function(snapshot) {
      snapshot.forEach(function(doc) {
        //const newList = list.concat(JSON.stringify(`${doc.data().question}`))
       // setList(newList);
       qpo.push(JSON.stringify(`${doc.data().question}`));
       if(`${doc.data().answerable}`=='false'){
         apo.push('(close)')
       }else{
         apo.push('(open)')
       }
       let today=new Date();
       dpo.push(`${((today-doc.data().date.toDate())/(1000*60*60*24)).toFixed(0)}`);
       

      });
      // setqList(qpo); 
      // setaList(apo);
      // setdList(dpo);
  });

  const fetcher = url => fetch(url)
  .then(res => (res.json()))
  .then(data => {
    console.log("data: ", data);
    setqList(data[0]);
    setaList(data[1]);
    setdList(data[2]);
  });
  const { data } = useSWR(
    '/api/getRecentPollInformation',
    fetcher
  );


  return (
    <div class="card">
          <div class="card-header">recent polls</div>
          <div class="card-body">
            <div class="card-columns">
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[0]}</h5>
                  {checkbut(alist[0])}
                </div>
                <div class="card-footer">
  <small class="text-muted">{dlist[0]}days ago{alist[0]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[1]}</h5>
                  {checkbut(alist[1])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[1]}days ago{alist[1]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[2]}</h5>
                  {checkbut(alist[2])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[2]}days ago{alist[2]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[3]}</h5>
                  {checkbut(alist[3])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[3]}days ago{alist[3]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[4]}</h5>
                  {checkbut(alist[4])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[4]}days ago{alist[4]}</small>
                </div>
              </div>
              <div class="card">
                <img
                  class="card-img-top"
                  src=".../100px180/?text=poll result graph"
                  alt="result"
                />
                <div class="card-body">
                  <h5 class="card-title">{qlist[5]}</h5>
                  {checkbut(alist[5])}
                </div>
                <div class="card-footer">
                  <small class="text-muted">{dlist[5]}days ago{alist[5]}</small>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-primary">
              view all
            </a>
          </div>
        </div>
  );
}

function Apoll(){
  return(<div>{Poppoll()}{Repoll()}</div>)
}

export default Apoll;
