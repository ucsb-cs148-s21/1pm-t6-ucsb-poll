import React, { Component,useState } from "react";
import Getpollinfo from "./NewPolls/Pollpagecomponent.js";
import useSWR from "swr";


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