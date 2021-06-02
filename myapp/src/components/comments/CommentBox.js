import React, {useState, useEffect} from 'react'
import { Button, Comment, Form, Header, Container, Icon, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ComposeComment from "./ComposeComment"
import useSWR from "swr";
import { useAuth0 } from "@auth0/auth0-react";

const CommentBox = (props) => {
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const [pollID, setPollID] = useState(props.pollID);
    const [commentData, setCommentData] = useState(props.commentData);

    const [buttonLoading, setButtonLoading] = useState(false);
    const [filter, setFilter] = useState("Recent");
    const [inputValue, setInputValue] = useState("");
    const [submittedComment, setSubmittedComment] = useState(false);

    const options = [
      {
        key: 'Recent',
        text: 'Recent',
        value: 'Recent',
      },
      {
        key: 'Popular',
        text: 'Popular',
        value: 'Popular',
      },
    ]

    if (props.pollID && props.pollID !== pollID) {
        setPollID(props.pollID);
    }


    // const fetcher = url => fetch(url).then(res => res.json())
    // const { commentData, error } =  useSWR(
    //     `/api/getComments/${pollID}/${filter}`,
    //     fetcher
    // );

    useEffect(() => {
        // setIsLoadingMorePolls(true);
        fetch(`/api/getComments/${pollID}/${filter}`)
        .then((res) => res.json())
        .then((data) => {
          setCommentData(data);
        })
        .catch((error) => console.log(error));
    }, [pollID, filter, submittedComment]);



    const addComment = async(e) => {
      const url = "/api/addComment";
      try {
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pollID: pollID, //add the poll ID here
                    author: user.name,
                    link : "/" + user.email,
                    text: e,
                          
                }),
              
            }).then(res => {setSubmittedComment(!submittedComment)})
        } catch (err) {
            console.log(`err=${err}`)
      } 
    }

    const handleSubmit = async (e) => {
      //send submission to db
      await addComment(inputValue);
      resetInputField();
    }
  
    // Input Field handler
    const handleUserInput = (e) => {
      setInputValue(e.target.value);
    };

    // Reset Input Field handler
    const resetInputField = () => {
      setInputValue("");
    };

    const handleFilter = (e, {value}) => {
      setFilter(value);
    };


    return (
        <Container style={{ margin: 20 }}>
            <Comment.Group>
                <Header as='h3' dividing>
                Comments
                </Header>


                <Form reply onSubmit = {() => handleSubmit()}> 
                  <Form.TextArea value={inputValue} onChange={handleUserInput} style={{ marginBottom: 0, height: 50 }}/>
                  <Button loading = {buttonLoading} content='Add Reply' labelPosition='left' icon='edit' style = {{marginBottom: 20, height:35}} />
                </Form>

                <Header as='h3' dividing>
                  <Dropdown
                    inline
                    options={options}
                    defaultValue={options[0].value}
                    onChange={handleFilter}

                  />

                </Header>
                
                {/* <ComposeComment commentID = "asdf" link = "/profile" author = "test" date = "Today" text = "hi" upvotes = {6} /> */}
                {(commentData) ? (commentData.map((i) => (
                  <ComposeComment pollID={pollID} commentData = {i} upvotes = {i[5]}/>
                ))) :
                  <p> No Comments Yet </p>
                }
                {/* <CommentComp></CommentComp> */}
            </Comment.Group>

        </Container>
    );
};




// function GetComments(props) {
//   const [pollID, setPollID] = useState("temp");
//   const [commentData, setCommentData] = useState();
//   if (props.pollID && pollID !== props.pollID)
//     setPollID(props.pollID);
//     //pollID = props.pollID;


//   const fetcher = url => fetch(url).then(res => res.json())
//   const { data, error } =  useSWR(
//       `/api/getComments/${pollID}`,
//       fetcher
//   );
//   if (data && commentData !== data) {
//     // console.log(data);
//     // var d = JSON.parse(data)
//     // if (data.commentID)
//     //   commentID = (data.commentID);
//     //commentData = data;
//     setCommentData(data);

//   }

  
//   return ( <CommentBox pollID = {pollID} commentData = {commentData} /> )

// }

export default CommentBox;
