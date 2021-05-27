import React, { Component,useState } from "react";
import Getpollinfo from "../components/polls/PollPageComponents/Pollpagecomponent.js";
import CommentBox from "../components/comments/CommentBox";

class PollPage extends Component {
    state = {
        pollID: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1),
    }

    componentDidMount() {
        this.setState({ 
            pollID: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1),
        });

    }
    componentDidUpdate(prevProps) {
        //check to see if anything has changed since last update. if so, we must reinitialize our values. 
        if (prevProps.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1)  !== this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1) ) {
            this.setState({ 
                pollID: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1),
            });
            
        }

    }


    render(){
        return(
            <div>
                <div style = {{marginLeft: 400, marginRight: 400}}>
                    <Getpollinfo pollID={this.state.pollID}/>
                    <div style = {{textAlign: "left", position: "relative"}}>
                        <CommentBox />
                    </div>
                </div>
            </div>
        )
    }
}

export default PollPage; 
