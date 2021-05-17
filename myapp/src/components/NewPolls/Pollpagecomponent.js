import React, {Component, useState, useEffect } from 'react';
import useSWR from "swr";
import PollResults from "./NewPollResults.js";

export function Getpollinfo(pollID){
    pollID = pollID.pollID
    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } =  useSWR(
        `/getPoll/${pollID}`,
        fetcher
        );
    
    // makes sure everything necessary loads
    if (error) return ("Failed to retrieve poll")
    if (!data) return ("Loading poll")
    //if (!data.votes) return ("No votes")
    if (!data.options) return ("No options")
    if (!data.question) return ("No question")
    
    if(!(data && JSON.stringify(data))) return ("Loading again")
    
    var d = (data && JSON.stringify(data))



    d = '[' + d
    d += ']'
    d = JSON.parse(d)

    var voteArray = [];
    if(d[0].option0){
    voteArray.push(d[0].option0);
    }
    if(d[0].option1){
    voteArray.push(d[0].option1);
    }
    if(d[0].option2){
    voteArray.push(d[0].option2);
    }
    if(d[0].option3){
    voteArray.push(d[0].option3);
    }

    const answerable = d[0].answerable
    let status=""
    if (answerable==false) {
        status="(already closed)"    
    }
    const attend=d[0].attend
    const category=d[0].category
    const date=d[0].date
    const dueDate=d[0].dueDate
    const options = d[0].options
    const question = d[0].question
    const days = ((Math.floor(Date.now() / 1000) - d[0].date.seconds)/(60*60*24)).toFixed(0);
    const hours = (((Math.floor(Date.now() / 1000) - d[0].date.seconds)%(60*60*24))/(60*60)).toFixed(0);
    

    
    return (
    <div>
        <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
        <br></br>
        
        <div class="w3-panel" class="w3-left-align">
            <h1><b> {question}</b></h1>
            <br></br>
            <p> Create by <b>name</b>  {days}days ago {status}</p>
        </div>
        <br></br>
        <div class="w3-row">
            <div class="w3-half w3-container" >
                <PollResults pollID={pollID} />
            </div>
            <div class="w3-half w3-container" >
                part2
            </div>
        </div>
    </div>
    )

}
export default Getpollinfo;