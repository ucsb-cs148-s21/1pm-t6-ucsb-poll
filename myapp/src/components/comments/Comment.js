import { Button, Comment, Form, Header, Container, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Profiler } from 'react';


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
                <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />

                <Comment.Content>
                    <Comment.Author as= {Link} 
                        to = {
                            "/profile"
                        }
                    >Elliot Fu</Comment.Author>
                    <Comment.Metadata>
                    <div>Yesterday at 12:30AM</div>
                    </Comment.Metadata>
                    <Comment.Text>
                    <p>This has been very useful for my research. Thanks as well!</p>
                    </Comment.Text>
                    <Comment.Actions>
                         <Comment.Action onClick={() => this.toggleReplyForm()}>
                            Reply
                        </Comment.Action>

                        <Comment.Action>       
                            <Icon name='thumbs up' />
                        </Comment.Action>

                    </Comment.Actions>

                    {showReplyBox && 
                        <Form reply onSubmit = {() => this.handleSubmit()}>
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    }

                </Comment.Content>
                



                    <Comment.Group>
                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                            <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text> <Link to={`/profile`} style={{color: 'blue'}}>@Elliot</Link> Elliot you are always so right :)</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>

                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                            <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>


                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                            <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Comment>

            </div>
        )
    }
}

export default CommentComp; 
