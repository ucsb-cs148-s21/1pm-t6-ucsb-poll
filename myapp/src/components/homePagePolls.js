import React, { Component } from 'react';
import useSWR from "swr";
import PollResults from "./NewPolls/tempnewpollcopyforhomepage.js"
<script src="https://www.w3schools.com/lib/w3.js"></script>

const initialList = [];
function checkbut(num){
  if(num==="(open)")
  {return (<button class="w3-border-green w3-white w3-quarter w3-round-large w3-opacity">vote</button>)
  }
  if(num==="(close)"){
  return(
    <button class="  w3-quarter w3-round-large w3-border-indigo w3-white w3-opacity">result</button>)}

}
function RecomPoll(){
return(
  <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
     
    <div class="w3-container " >
      
    <header class="w3-container">
    <h1 class=" w3-extralarge"></h1>
    <h1 class="w3-threequarter w3-extralarge w3-opacity ">Recommended Polls</h1>
    
    </header>
   
          
    
    <div class="card-columns">
    <div class="card">
    <div class="w3-card-4 " > 
    <header class="w3-container w3-sand">
    <h1 class="w3-large ">"Favorite topping on a pizza?"</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = "FFcmP1ZAsVc2eYWNNk9Y" /></p>
    </div>
    <footer class="w3-container ">
      
    <h5 class="w3-tiny">14 days ago(open)</h5>
    </footer>
    </div>
    </div>

    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-sand">
    <h1 class="w3-large">"Favorite soda drink?"</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = "M6qsfGs1daQlI3Luqiib" /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">16 days ago(open)</h5>
    </footer>
    </div>  
    </div>
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-sand">
    <h1 class="w3-large">What's your favorite book?</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = "ldWrJjKj7wPudp3ovuWO" /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">1 days ago(open)</h5>
    </footer>
    </div>  
    </div>
    
    </div>
     
    <h1 class=" w3-extralarge"></h1>
    </div>
    </div>
    
)
}
function Poppoll(){
  const [qlist, setqList] = React.useState(initialList);
  const [alist, setaList] = React.useState(initialList);
  const [dlist, setdList] = React.useState(initialList);
  const [idlist, setidList] = React.useState(initialList);

  const fetcher = url => fetch(url)
    .then(res => (res.json()))
    .then(data => {
      //console.log("data: ", data);
      setqList(data[0]);
      setaList(data[1]);
      setdList(data[2]);
      setidList(data[3]);
    });
  const { data } = useSWR(
    '/api/getPopularPollInformation',
    fetcher 
  );


  return (
    <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
     
    <div class="w3-container " >
      
    <header class="w3-container">
    <h1 class=" w3-extralarge"></h1>
    <h1 class="w3-threequarter w3-extralarge w3-opacity ">Popular polls</h1>
    <button class="w3-large w3-quarter w3-round-large w3-opacity">view all</button>
    </header>
   
          
    
    <div class="card-columns">
    <div class="card">
    <div class="w3-card-4 " > 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large ">{qlist[0]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[0]+"").substring(1,21)} /></p>
    </div>
    <footer class="w3-container ">
      
    <h5 class="w3-tiny">{dlist[0]} days ago{alist[0]}</h5>
    </footer>
    </div>
    </div>

    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large">{qlist[1]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[1]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[1]} days ago{alist[1]}</h5>
    </footer>
    </div>  
    </div>
    
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large">{qlist[2]}</h1>
    </header>
    <div class="w3-container ">
    
    <p ><PollResults pollID = {(idlist[2]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[2]} days ago{alist[2]}</h5>
    </footer>
    </div>
    </div>
    
    <div class="card">
    <div class="w3-card-4"> 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large">{qlist[3]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[3]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[3]} days ago{alist[3]}</h5>
    </footer>
    </div>
    </div>
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large">{qlist[4]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[4]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[4]} days ago{alist[4]}</h5>
    </footer>
    </div>
    </div>
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-pale-green">
    <h1 class="w3-large">{qlist[5]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[5]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[5]} days ago{alist[5]}</h5>
    </footer>
    </div>
    </div>
    </div>
     
    <h1 class=" w3-extralarge"></h1>
    </div>
    </div>
    
   
        
  );
}

function Repoll(){
  const [qlist, setqList] = React.useState(initialList);
  const [alist, setaList] = React.useState(initialList);
  const [dlist, setdList] = React.useState(initialList);
  const [idlist, setidList] = React.useState(initialList);

  const fetcher = url => fetch(url)
    .then(res => (res.json()))
    .then(data => {
      //console.log("data: ", data);
      setqList(data[0]);
      setaList(data[1]);
      setdList(data[2]);
      setidList(data[3]);
    });
  const { data } = useSWR(
    '/api/getRecentPollInformation',
    fetcher 
  );


  return (
    <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
     
    <div class="w3-container " >
      
    <header class="w3-container">
    <h1 class=" w3-extralarge"></h1>
    <h1 class="w3-threequarter w3-extralarge w3-opacity ">Recent polls</h1>
    <button class="w3-large w3-quarter w3-round-large w3-opacity">view all</button>
    </header>
   
          
    
    <div class="card-columns">
    <div class="card">
    <div class="w3-card-4 " > 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large ">{qlist[0]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[0]+"").substring(1,21)} /></p>
    </div>
    <footer class="w3-container ">
      
    <h5 class="w3-tiny">{dlist[0]} days ago{alist[0]}</h5>
    </footer>
    </div>
    </div>

    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large">{qlist[1]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[1]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[1]} days ago{alist[1]}</h5>
    </footer>
    </div>  
    </div>
    
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large">{qlist[2]}</h1>
    </header>
    <div class="w3-container ">
    
    <p ><PollResults pollID = {(idlist[2]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[2]} days ago{alist[2]}</h5>
    </footer>
    </div>
    </div>
    
    <div class="card">
    <div class="w3-card-4"> 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large">{qlist[3]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[3]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[3]} days ago{alist[3]}</h5>
    </footer>
    </div>
    </div>
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large">{qlist[4]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[4]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[4]} days ago{alist[4]}</h5>
    </footer>
    </div>
    </div>
    <div class="card">
    <div class="w3-card-4 "> 
    <header class="w3-container w3-light-blue">
    <h1 class="w3-large">{qlist[5]}</h1>
    </header>
    <div class="w3-container ">
    <p ><PollResults pollID = {(idlist[5]+"").substring(1,21)} /></p>
    
    </div>
    <footer class="w3-container ">
    <h5 class="w3-tiny">{dlist[5]} days ago{alist[5]}</h5>
    </footer>
    </div>
    </div>
    </div>
     
    <h1 class=" w3-extralarge"></h1>
    </div>
    </div>
    
   
        
  );
}

function Apoll(){
  return(
    <div>
    <RecomPoll />
    <Poppoll />
    <Repoll />
    </div>
  )
}

export default Apoll;
