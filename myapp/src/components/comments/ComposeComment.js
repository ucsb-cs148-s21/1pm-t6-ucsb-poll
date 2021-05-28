import { Button, Comment, Form, Header, Container, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Profiler } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import ComposeReplies from "./ComposeReplies"



function ComposeComment(props) {
    const { isAuthenticated } = useAuth0();
    const [showReplyBox, setReplyBox] = useState(false);
    const [userHasVoted, setUserUpvote] = useState(false);

    const [pollID, setPollID] = useState(props.pollID);
    const [commentData, setCommentData] = useState(props.commentData);
    const [commentID, setCommentID] = useState("tempCommentID");

    // const [commentID, setCommentID] = useState(props.commentID);
    // const [link, setlink] = useState(props.link);
    // const [author, setAuthor] = useState(props.author);
    // const [date, setDate] = useState(props.date);
    // const [text, setText] = useState(props.text);
    const [upvotes, setUpvote] = useState(props.upvotes);


    // const [commentID, setCommentID] = useState(props.commentData[0]);
    // const [link, setlink] = useState(props.commentData[1]);
    // const [author, setAuthor] = useState(props.commentData[2]);
    // const [date, setDate] = useState(props.commentData[3]);
    // const [text, setText] = useState(props.commentData[4]);
    // const [upvotes, setUpvote] = useState(props.commentData[5]);

    if (props.pollID && props.pollID !== pollID) {
        setPollID(props.pollID);
    }

    if (props.commentData && props.commentData !== commentData) {
        setCommentData(props.commentData);
    }


    // const fetcher = (url) => fetch(url).then((res) => res.json())
    // const { data } = useSWR(`/api/getCommentReplies/${commentID}`, fetcher);



    const toggleReplyForm = () => {
        setReplyBox(!showReplyBox);
    }

    const handleSubmit = () => {
        //todo: send new reply to database
        setReplyBox(false);
    }

    const toggleUpvote = () => {
        //todo: update database to handle upvotes

        if (userHasVoted) {
            setUpvote(upvotes - 1);
        }
        else {
            setUpvote(upvotes + 1);  
        }
        setUserUpvote(!userHasVoted)
    }

    console.log("comment Data: ", commentData)
    return (
        <Comment>
        <Comment.Content>
        <Comment.Author as= {Link} 
            to = {commentData[1]}
        >{commentData[2]}</Comment.Author>
        <Comment.Metadata>
        <div class = "date">{Date.parse(commentData[3])}</div>
        </Comment.Metadata>
        <Comment.Text>
        <p>{commentData[4]}</p>
        </Comment.Text>
        <Comment.Actions>
             <Comment.Action onClick={toggleReplyForm}>
                Reply
            </Comment.Action>

            <Comment.Action onClick = {isAuthenticated && toggleUpvote} active = {userHasVoted} >       
                {upvotes!== 0 && upvotes} <Icon name='thumbs up' />
            </Comment.Action>

        </Comment.Actions>

        {showReplyBox && 
            <Form reply onSubmit = {handleSubmit}>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        }

        </Comment.Content>

        <Comment.Group>
            {/* replies go here */}
            <ComposeReplies commentID = "" link = "/profile" author = "Anon" date = "Just Now" text = "reply hi" upvotes = {0} isReplytoReply = {true} replyeeName = "Elliot" replyeeLink = "/profile"/>
            
        </Comment.Group>

        </Comment>
    );

}


export default ComposeComment;