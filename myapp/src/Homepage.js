
//not a working one right now, just for my team to view
/*
const db=firebase.database().ref();
const pools=db.child('pools');
const sortbydate=pools.oderByChild('date').limitToFirst(6);
const sortbypop=pools.oderByChild('participants').limitToFirst(6);

sortbydate.once('value',snap => console.log(snap.val()))
*/

import { response } from "express";
import useSWR from "swr";
function getppoll(){
  const fetcher = url => fetch(url).then(response=>response.json())
  const{data}=useSWR(
    `/api/getpoll/${date}`,
    fetcher
  );
  const 
}