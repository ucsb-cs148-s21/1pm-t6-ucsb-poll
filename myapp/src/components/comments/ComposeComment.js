import {Button,Comment,Form,Header,Container,Icon,} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR from "swr";
import ComposeReplies from "./ComposeReplies";
import timeSince from "../util/timeSince"

function ComposeComment(props) {
  const { isAuthenticated, user } = useAuth0();
  const [showReplyBox, setReplyBox] = useState(false);
  const [userHasVoted, setUserUpvote] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [pollID, setPollID] = useState(props.pollID);
  const [commentData, setCommentData] = useState(props.commentData);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [upvotes, setUpvote] = useState(props.upvotes);
  const [inputValue, setInputValue] = useState("");

  const [data, setData] = useState(props.data);
  const [submittedComment, setSubmittedComment] = useState(false);


  if (props.pollID && props.pollID !== pollID) {
    setPollID(props.pollID);
    setUpvote(props.upvotes);

  }

  if (props.commentData && props.commentData !== commentData) {
    setCommentData(props.commentData);
    setUpvote(props.upvotes);
  }

//   const fetcher = (url) => fetch(url).then((res) => res.json());
//   const { data } = useSWR(
//     `/api/getReplies/${pollID}/${commentData[0]}`,
//     fetcher
//   );

  useEffect(() => {
    // setIsLoadingMorePolls(true);
    fetch(`/api/getReplies/${pollID}/${commentData[0]}`)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.log(error));
}, [pollID, commentData, submittedComment]); 
  console.log(data);


  const addReply = async (e) => {
    const url = "/api/addReply";
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pollID: pollID, //add the poll ID here
          commentID: commentData[0],
          author: user.name,
          link: "/" + user.email,
          text: e,
          isReplytoReply: false,
          replyeeName : "none",
          replyeeLink : "none",
        }),
      }).then(res => {setSubmittedComment(!submittedComment)})
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
            commentID: commentData[0],
            replyID: "none",
            isReply : false,
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

  const handleSubmit = async (e) => {
    setReplyBox(false);
    //send reply to db
    await addReply(inputValue);
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
    //todo: update database to handle upvotes

    if (userHasVoted) {
      setUpvote(upvotes - 1);
      addUpvote(-1);
    } else {
      setUpvote(upvotes + 1);
      addUpvote(1);
    }
    setUserUpvote(!userHasVoted);
  };

  const toggleShowReplies = () => {
      setShowReplies(!showReplies);
  }

  // console.log("comment Data: ", commentData)
  // console.log ("date", commentData[3])

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as={Link} to={commentData[1]}>
          {commentData[2]}
        </Comment.Author>
        <Comment.Metadata>
          <div class="date">{timeSince(new Date(commentData[3]))}</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>{commentData[4]}</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={toggleReplyForm}>Reply</Comment.Action>

          <Comment.Action
            onClick={isAuthenticated && toggleUpvote}
            active={userHasVoted}
          >
            {upvotes !== 0 && upvotes} <Icon name="thumbs up" />
          </Comment.Action>

        {  (data && data.length !== 0) &&  
          <Comment.Action
            onClick={toggleShowReplies}
            active={showReplies}
          >
            <div style = {{color: "blue"}}>Show Replies</div>
          </Comment.Action>}
        </Comment.Actions>

        {showReplyBox && (
          <Form reply onSubmit={() => handleSubmit()}>
            <Form.TextArea
              value={inputValue}
              onChange={handleUserInput}
              style={{ marginBottom: 0, height: 50 }}
            />
            <Button
              loading={buttonLoading}
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              style={{ marginBottom: 20, height: 35 }}
            />
          </Form>
        )}
      </Comment.Content>

    { showReplies &&       
        <Comment.Group>
        {/* replies go here */}
        {(data && data.length !== 0) ? (
        data.map((i) => (
            <ComposeReplies
            pollID={pollID}
            commentID={commentData[0]}
            replyData={i}
            upvotes = {i[5]}
            />
        ))
        ) : (
        <p> No Replies Yet </p>
        )}
        </Comment.Group>
      }
    </Comment>
  );
}

export default ComposeComment;
