import React, { Component } from "react";
import VoteForm from '../components/polls/VoteForm';


const CreatePollPage = (props) => {

  const saveVoteDataHandler = (enteredVoteData) => {
    const url = "/addNewPoll"
    try {
          const result = fetch(url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ...enteredVoteData
              }),
          });
          console.log(`result=${JSON.stringify(result)}`);  

      } catch (err) {
          console.log(`err=${err}`)
      } 
  };

  return (

    <div className="container">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <div class="jumbotron">
            <h1 class="display-4">Create a New Poll</h1>
        </div>
        <div className='new-action'>
            <VoteForm
            onSaveVoteData={saveVoteDataHandler}
            onCancelDisplay = {false}
            />
        </div>
    </div>
  );
};

export default CreatePollPage;
