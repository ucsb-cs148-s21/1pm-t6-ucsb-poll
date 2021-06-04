import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import './VoteForm.css';
 
const VoteForm = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const [email, setEmail] = useState("temp@temp.com");
  const [name, setName] = useState ("temp");

  if (user && user.email !== email) {
    setEmail(user.email); 
  }

  if (user && user.name !== name) {
    setName(user.name); 
  }
  const [enteredQuestions, setEnteredQuestions] = useState('');
  const [enteredCategories, setEnteredCategories] = useState('art');
  const [enterDueDate, setEnterDueDate] = useState('');
  const [enterVoteOp1, setEnterVoteOp1] = useState('');
  const [enterVoteOp2, setEnterVoteOp2] = useState('');
  const [enterVoteOp3, setEnterVoteOp3] = useState('');
  const [enterVoteOp4, setEnterVoteOp4] = useState('');
  const [enterVoteOp5, setEnterVoteOp5] = useState('');
  const [enterVoteOp6, setEnterVoteOp6] = useState('');
  const [enterVoteOp7, setEnterVoteOp7] = useState('');
  const [enterVoteOp8, setEnterVoteOp8] = useState('');

  const [cancelButtonDisplay, setCancelButtonDisplay] = useState(true);
  const [numberOfOptions, changeNumofOptions] = useState(2);

  if (props.cancelButtonDisplay !== cancelButtonDisplay) {
    setCancelButtonDisplay(props.cancelButtonDisplay);
  }

  const QuestionsChangeHandler = (event) => {
    setEnteredQuestions(event.target.value);
  };

  const CategoriesChangeHandler = (event) => {
    setEnteredCategories(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnterDueDate(event.target.value);
  };
  const VoteOp1ChangeHandler = (event) => {
    setEnterVoteOp1(event.target.value);
  };
  const VoteOp2ChangeHandler = (event) => {
    setEnterVoteOp2(event.target.value);
  };
  const VoteOp3ChangeHandler = (event) => {
    setEnterVoteOp3(event.target.value);
  };
  const VoteOp4ChangeHandler = (event) => {
    setEnterVoteOp4(event.target.value);
  };
  const VoteOp5ChangeHandler = (event) => {
    setEnterVoteOp5(event.target.value);
  };
  const VoteOp6ChangeHandler = (event) => {
    setEnterVoteOp6(event.target.value);
  };
  const VoteOp7ChangeHandler = (event) => {
    setEnterVoteOp7(event.target.value);
  };
  const VoteOp8ChangeHandler = (event) => {
    setEnterVoteOp8(event.target.value);
  };

  const addVoteOption = (event) => {
    changeNumofOptions(numberOfOptions + 1);
  }

  const removeVoteOption = (event) => {
    changeNumofOptions(numberOfOptions - 1);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    var vote = [];
    vote.push(enterVoteOp1);
    vote.push(enterVoteOp2);


    if (numberOfOptions >= 3)
      vote.push(enterVoteOp3);
    if (numberOfOptions >= 4)
      vote.push(enterVoteOp4);
    if (numberOfOptions >= 5)
      vote.push(enterVoteOp5);
    if (numberOfOptions >= 6)
      vote.push(enterVoteOp6);
    if (numberOfOptions >= 7)
      vote.push(enterVoteOp7);
    if (numberOfOptions >= 8)
      vote.push(enterVoteOp8);

    const VoteData = {
      question: enteredQuestions,
      category: enteredCategories,
      answerable: true,
      date: new Date(enterDueDate),
      options: vote,
      email: email,
      name: name,
    };

    props.onSaveVoteData(VoteData);
    setEnteredQuestions('');
    setEnteredCategories('art');
    setEnterDueDate('');
    setEnterVoteOp1('');
    setEnterVoteOp2('');
    setEnterVoteOp3('');
    setEnterVoteOp4('');
    setEnterVoteOp5('');
    setEnterVoteOp6('');
    setEnterVoteOp7('');
    setEnterVoteOp8('');

  };
  var newDate = new Date()
  var date_raw = newDate.getDate().toLocaleString();
  var date_month = (newDate.getMonth()+1).toLocaleString();
  var date_year = newDate.getFullYear().toLocaleString();
  var ndate_year= date_year.replace(",", "");
  var rightDate = ndate_year+"-"+date_month+"-"+ date_raw;
  return (
    <form onSubmit={submitHandler}>
      
        <div className='new-title__controls'>
          <label>Question</label>
          <input
            type='text'
            value={enteredQuestions}
            onChange={QuestionsChangeHandler}
          />
        </div>
        <div className='new-title__controls'>
          <label>Category</label>
          {/* <input
            type='text'   
            value={enteredCategories}
            onChange={CategoriesChangeHandler}
          /> */}
          <select value={enteredCategories} onChange={CategoriesChangeHandler}>
           <option selected value="art">Art and Literature</option>
           <option value="career">Career</option>
           <option value="food">Food and Drink</option>
           <option value="fun">Fun and Games</option>
           <option value="movies">Movies and TV</option>
           <option value="music">Music</option>
           <option value="school">School</option>
           <option value="travel">Travel</option>
           <option value="other">Other</option>
          </select>
        </div>
        <div className='new-title__controls'>
          <label>Due Date</label>
          <input
            type='date'
            min={rightDate}
            max='2022-12-31'
            value={enterDueDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option1</label>
          <input
            type='text'
            value={enterVoteOp1}
            onChange={VoteOp1ChangeHandler}
          />
        </div>
        <div className='new-VoteOp__control'>
          <label>Vote option2</label>
          <input
            type='text'
            value={enterVoteOp2}
            onChange={VoteOp2ChangeHandler}
          />
        </div>
{        numberOfOptions >= 3 && 
          <div className='new-VoteOp__control'>
          <label>Vote option3</label>
          <input
            type='text'
            value={enterVoteOp3}
            onChange={VoteOp3ChangeHandler}
          />
        </div>}

        { numberOfOptions >= 4 && 
          <div className='new-VoteOp__control'>
          <label>Vote option4</label>
          <input
            type='text'
            value={enterVoteOp4}
            onChange={VoteOp4ChangeHandler}
          />
        </div>}
        
        { numberOfOptions >= 5 && 
          <div className='new-VoteOp__control'>
          <label>Vote option5</label>
          <input
            type='text'
            value={enterVoteOp5}
            onChange={VoteOp5ChangeHandler}
          />
        </div>}
        
        { numberOfOptions >= 6 && 
          <div className='new-VoteOp__control'>
          <label>Vote option6</label>
          <input
            type='text'
            value={enterVoteOp6}
            onChange={VoteOp6ChangeHandler}
          />
        </div>}
        
        { numberOfOptions >= 7 && 
          <div className='new-VoteOp__control'>
          <label>Vote option7</label>
          <input
            type='text'
            value={enterVoteOp7}
            onChange={VoteOp7ChangeHandler}
          />
        </div>}
        
        { numberOfOptions >= 8 && 
          <div className='new-VoteOp__control'>
          <label>Vote option8</label>
          <input
            type='text'
            value={enterVoteOp8}
            onChange={VoteOp8ChangeHandler}
          />
        </div>}

        <button type="button" onClick={addVoteOption} disabled = {numberOfOptions === 8}>Add Vote Option</button>
        <button type="button" onClick={removeVoteOption} disabled = {numberOfOptions === 2}>Remove Vote Option</button>

      
      <div className='new-action'>
        {cancelButtonDisplay && <button type="button" onClick={props.onCancel}>Cancel</button>}
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default VoteForm;
