import { Button, Comment, Form, Header, Container, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Profiler } from 'react';
import ComposeComment from "./ComposeComment"

class CommentComp extends Component {
    state = {
        pollComment: true, 
        commentID: this.props.id,
        replies: this.props.replies,
        text : "",
        showReplyBox : false,
        likes : 0,
    }

    componentDidMount() {
        this.setState({ 
            commentID: this.props.id,
        });

    }
    componentDidUpdate(prevProps) {
        //check to see if anything has changed since last update. if so, we must reinitialize our values. 
        if (prevProps.id !== this.props.id) {
            this.setState({ 
                commentID: this.props.id,
            });
            
        }
    }



    toggleReplyForm = (item) => {
        this.setState({ 
            showReplyBox: !(this.state.showReplyBox),
        });

    }

    handleSubmit = (item) => {
        this.setState({ 
            showReplyBox: false,
        });

    }


    render(){
        const { showReplyBox } = this.state
        return(
            <div>
                <ComposeComment commentID = "asdf" link = "/profile" author = "test" date = "Today" text = "hi" upvotes = {6} />
                <ComposeComment commentID = "asdf" link = "/profile" author = "test" date = "Today" text = "hi" upvotes = {6} />


            </div>
        )
    }
}


export default CommentComp; 
