import React, {useState, useEffect} from 'react'
import { Button, Comment, Form, Header, Container, Icon, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CommentComp from "./Comment"
import { useAuth0 } from "@auth0/auth0-react";

const CommentBox = (props) => {
    const { user, getAccessTokenSilently: getToken } = useAuth0();
    const [pollID, setPollID] = useState("tempID");
    const [showReplyForm, setReplyForm] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [filter, setFilter] = useState("");


    const [inputValue, setInputValue] = useState("");

    //get comments... get their replies. 
    // 
    const options = [
      {
        key: 'Popular',
        text: 'Popular',
        value: 'Popular',
      },
      {
        key: 'Recent',
        text: 'Recent',
        value: 'Recent',
      },
    ]

    if (props.pollID && props.pollID !== pollID) {
        setPollID(props.pollID);

        //reset num of polls displayed
    }
  
    useEffect(() => {
        // setIsLoadingMorePolls(true);
        fetch(`/api/getPollInformation/`)
        .then((res) => res.json())
        .then((data) => {
        })
        .catch((error) => console.log(error));
    }, []);



    const handleSubmit = (item) => {
      setReplyForm(false);
      //setButtonLoading(true);
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

                <Button loading = {filter == "Popular"} content='Add Reply' labelPosition='left' icon='edit' style = {{marginBottom: 20, height:35}} />
                </Header>
                
                <CommentComp></CommentComp>
            </Comment.Group>

        </Container>
    );
};

export default CommentBox
