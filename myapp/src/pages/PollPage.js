import React, { Component,useState } from "react";
import Getpollinfo from "../components/polls/Pollpagecomponent.js";

class PollPage extends Component {
    pollid=this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1);
    render(){
        return(
            <div>
                <div>
                    <Getpollinfo pollID={this.pollid}/>
                </div>
            </div>
        )
    }
}

export default PollPage; 