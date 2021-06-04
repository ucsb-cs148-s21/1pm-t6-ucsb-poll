import React, {Component, useState, useEffect } from 'react';
import useSWR from "swr";
import PollResults from "../PollResults";

function convertCategory(category) {
    if (category == "art")
        return "Art and Literature"
    else if (category == "career")
        return "Career"
    else if (category === "food")
        return "Food and Drink"
    else if (category === "fun")
        return "Fun and Games"
    else if (category === "movies") 
        return "Movies and TV"
    else if (category === "music") 
        return "Music"
    else if (category === "school") 
        return "School" 
    else if (category === "travel") 
        return "Travel"
    else if (category == "other")
        return "Other"
    else
        return ""

}



export function Getpollinfo(pollID){
    const [creator, setCreator] = useState("");
    
    pollID = pollID.pollID
    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } =  useSWR(
        `/getPoll/${pollID}`,
        fetcher
        );
    
    // makes sure everything necessary loads
    if (error) return ("Failed to retrieve poll")
    if (!data) return ("We don't have such poll :(, please search for a new one")
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
    const category= convertCategory(d[0].category)
    const date=d[0].date
    const dueDate=d[0].dueDate
    const options = d[0].options
    const question = d[0].question
    const days = ((Math.floor(Date.now() / 1000) - d[0].date.seconds)/(60*60*24)).toFixed(0);
    const hours = (((Math.floor(Date.now() / 1000) - d[0].date.seconds)%(60*60*24))/(60*60)).toFixed(0);
    
    if (d[0].creator && creator !== "by " + d[0].creator) {
        setCreator("by " + d[0].creator);
    }
    
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
            <div class="ui blue labels">
{                (category !== "") && <a class="ui label">
                    {category}
                </a>}
            </div>
            <p> Created {creator} {days} days ago {status}</p>
        </div>
        <br></br>
        <PollResults pollID={pollID} />
    </div>
    )

}
export default Getpollinfo;