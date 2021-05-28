
import { Button, Comment, Form, Header, Container, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Profiler } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";



function ComposeReplies(props) {
    const { isAuthenticated } = useAuth0();
    const [showReplyBox, setReplyBox] = useState(false);
    const [userHasVoted, setUserUpvote] = useState(false);


    const [commentID, setCommentID] = useState(props.commentID);
    const [link, setlink] = useState(props.link);
    const [author, setAuthor] = useState(props.author);
    const [date, setDate] = useState(props.date);
    const [text, setText] = useState(props.text);
    const [upvotes, setUpvote] = useState(props.upvotes);

    const [isReplytoReply, setReply] = useState(false);
    const [replyeeName, setReplyName] = useState("");
    const [replyeeLink, setReplyLink] = useState("");

    if (props.isReplytoReply && isReplytoReply !== props.isReplytoReply) {
        setReply(true);
        setReplyName(props.replyeeName);
        setReplyLink(props.replyeeLink);
    }



    const toggleReplyForm = () => {
        setReplyBox(!showReplyBox);
    }

    const handleSubmit = () => {
        setReplyBox(false);
    }

    const toggleUpvote = () => {
        //todo: update database to handle upvotes

        //logic is reversed here... refactor this if possible
        if (userHasVoted) {
            setUpvote(upvotes-1);
        }
        else {
            setUpvote(upvotes +1);
        }
        setUserUpvote(!userHasVoted)
    }


    return (
        <Comment>
        <Comment.Content>
        <Comment.Author as= {Link} 
            to = {link}
        >{author}</Comment.Author>
        <Comment.Metadata>
        <div class = "date">{date}</div>
        </Comment.Metadata>
        <Comment.Text>
        <Comment.Text> {isReplytoReply && <Link to={replyeeLink} style={{color: 'blue'}}>@{replyeeName}</Link>} {text}</Comment.Text>
        </Comment.Text>
        <Comment.Actions>
             <Comment.Action onClick={toggleReplyForm}>
                Reply
            </Comment.Action>

            <Comment.Action onClick = {isAuthenticated && toggleUpvote} active = {userHasVoted} >       
                {upvotes !== 0 && upvotes} <Icon name='thumbs up' />
            </Comment.Action>

        </Comment.Actions>

        {showReplyBox && 
            <Form reply onSubmit = {handleSubmit}>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        }

        </Comment.Content>
        </Comment>
    );

}


export default ComposeReplies;