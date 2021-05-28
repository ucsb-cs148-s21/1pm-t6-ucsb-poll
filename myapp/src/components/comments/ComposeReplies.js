
import { Button, Comment, Form, Header, Container, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Profiler } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import timeSince from "../util/timeSince"


function ComposeReplies(props) {
    const { isAuthenticated, user } = useAuth0();
    const [showReplyBox, setReplyBox] = useState(false);
    const [userHasVoted, setUserUpvote] = useState(false);
    const [inputValue, setInputValue] = useState("");


    const [pollID, setPollID] = useState(props.pollID);
    const [commentID, setCommentID] = useState(props.commentID);
    const [replyData, setReplyData] = useState(props.replyData);
    const [upvotes, setUpvote] = useState(props.upvotes);
  
    if (props.pollID && props.pollID !== pollID) {
        setPollID(props.pollID);
      }
    
    if (props.replyData && props.replyData !== replyData) {
        setReplyData(props.replyData);
    }


    const addReplyToReply = async (e) => {
        const url = "/api/addReply";
        try {
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pollID: pollID, //add the poll ID here
                commentID: commentID,
                author: user.name,
                link: "/" + user.email,
                text: e,

                isReplytoReply: true,
                replyeeName : replyData[2],
                replyeeLink : replyData[1],
            }),
            });
        } catch (err) {
            console.log(`err=${err}`);
        }
    };

    const addUpvote = async (e) => {
        const url = "/api/upvoteComment";
        try {
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pollID: pollID, //add the poll ID here
                commentID: commentID,
                replyID: replyData[0],
                isReply : true,
                vote : e,
            }),
            });
        } catch (err) {
            console.log(`err=${err}`);
        }


    };


    const toggleReplyForm = () => {
    setReplyBox(!showReplyBox);
    };

    const handleSubmit = (e) => {
    setReplyBox(false);
    //send reply to db
    addReplyToReply(inputValue);
    resetInputField();
    };

    // Input Field handler
    const handleUserInput = (e) => {
    setInputValue(e.target.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
    setInputValue("");
    };



    const toggleUpvote = () => {
        if (userHasVoted) {
            setUpvote(upvotes-1);
            addUpvote(-1);
        }
        else {
            setUpvote(upvotes +1);
            addUpvote(1);
        }
        setUserUpvote(!userHasVoted)
    }


    return (
        <Comment>
        <Comment.Content>
        <Comment.Author as= {Link} 
            to = {replyData[1]}
        >{replyData[2]}</Comment.Author>
        <Comment.Metadata>
        <div class = "date">{timeSince(new Date(replyData[3]))}</div>
        </Comment.Metadata>
        <Comment.Text>
        <Comment.Text> {replyData[6] && <Link to={replyData[7]} style={{color: 'blue'}}>@{replyData[8]}</Link>} {replyData[4]}</Comment.Text>
        </Comment.Text>
        <Comment.Actions>
             <Comment.Action onClick={toggleReplyForm}>
                Reply
            </Comment.Action>

            <Comment.Action onClick = {isAuthenticated && toggleUpvote} active = {userHasVoted} >       
                {upvotes !== 0 && upvotes} <Icon name='thumbs up' />
            </Comment.Action>

        </Comment.Actions>

        {showReplyBox && (
          <Form reply onSubmit={() => handleSubmit()}>
            <Form.TextArea
              value={inputValue}
              onChange={handleUserInput}
              style={{ marginBottom: 0, height: 50 }}
            />
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              style={{ marginBottom: 20, height: 35 }}
            />
          </Form>
        )}

        </Comment.Content>
        </Comment>
    );

}


export default ComposeReplies;