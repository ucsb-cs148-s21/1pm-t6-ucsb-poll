import React, { Component, useState, useEffect } from 'react'
import useSWR from "swr";
import { Checkmark } from 'react-checkmark'
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import Spinner from 'react-bootstrap/Spinner'

import './NewPollResults.css' // style sheets for making polls look nice later
//import { sleep } from 'stream-chat/dist/types/utils';

class PollResults extends Component {
    //const {isAuthenticated, user} = useAuth0();
    state = {
        members: [{name : "default", voteCount: 34, chosen : true}],
        question: "default question",
        answerable: true,
        voted: false,
        pollID: this.props.pollID,
        email: this.props.auth0.email, //this.props.email,
        totalVotes: 0,
        showResults: false, // related to show results button clicked state
        optionVotedOn: null,
        loading: true,
    }

    componentDidMount() {
        this.initializeValues();
    }



    componentDidUpdate(prevProps) {
        if (prevProps.pollID != this.props.pollID) {
            this.setState({loading: false});
            this.initializeValues();

        }
    }


    initializeValues() {
        const {user} = this.props.auth0;
        var email = "temp@temp.com";
        if (user)
            email = user.email
        var answerable = true;
        var voted = false;
        var chosenOption = -1;
        var pollID = this.props.pollID;
        var options = [];
        var question = "";
        var voteArray = [];
        var members = []

        if (!pollID || pollID == "ndefined" || pollID == undefined) {
            return "Error";
        }

        fetch(`/getPoll/${pollID}`, {
            method: "GET",
            headers: {
                 Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("poll data: ", data);
            var d = (data && JSON.stringify(data))
            d = '[' + d
            d += ']'
            d = JSON.parse(d)
            options = d[0].options
            console.log("options:", options);
            question = d[0].question
            voteArray.push(d[0].option0);
            voteArray.push(d[0].option1);
            voteArray.push(d[0].option2);
            voteArray.push(d[0].option3);   
            const dateClosed = new Date(d[0].dueDate)
            const today = new Date()
            const daysSinceClose = dateClosed - today
            if(daysSinceClose <= 0){   
                this.setState({                             
                    voted: true,
                    answerable: false,
                    showResults: true, 
                });
            }
            var totalVotes = 0;
            for(var x = 0; x < options.length; x++){
                totalVotes += voteArray[x];
                var element = {
                    name: options[x],
                    voteCount: voteArray[x],
                    chosen: (x == chosenOption ? true : false) //set chosen to true if it's our chosen option
                };
                members.push(element)
            }
            console.log("members:", members);  
            this.setState({ 
                members : members,
                totalVotes: totalVotes, 
            });
            
            fetch(`/api/getUser/${email}`, {
                method: "GET",
                headers: {
                     Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then(response => response.json())
            .then(data1 => {
                console.log("real data: ", data1);
                for (var i = 0; i < data1['votedList'].length; i++) { 
                    if (data1['votedList'][i] == pollID) {
                        
                        //chosenOption = 2;
                        console.log("Already voted on :", pollID);
                        //members[0].chosen = true;

                        this.setState({loading: false});
                        fetch(`/api/getUserVote/${email}/voteHistory/${pollID}`, {
                            method: "GET",
                            headers: {
                                 Accept: "application/json",
                                "Content-Type": "application/json",
                            },
                        })
                        .then(response => response.json())
                        .then(data2 => {
                            console.log("data2: ", data2);
                            if (members[data2['option']]) //make sure this isn't undefined... although it should never be undefined?
                                members[data2['option']].chosen = true;
                            this.setState({members: members}) 
                        });
            


                        this.setState({
                            //members: members,
                            voted: true,
                            answerable: false,
                            showResults: true,
                            totalVotes: this.sumVotes(),
                            loading: false,
                        })
                    }
                }

                this.setState({loading: false});
            });


        });


        this.setState({ 
            //members: members,
            // question: question,
            email: email,
            pollID: this.props.pollID,
            totalVotes: this.sumVotes(),
        });
    }

    // handleVote = e => console.log('button clicked for ' + e);
    // handleUnvote = e => console.log('button clicked for ' + e);

    sumVotes = () => {
        const tot = this.state.members.reduce((total, member) => total + member.voteCount, 0) // adds up all the votes

        return tot

    }

    handleVote = (e, member) => { // vote added
        const orig = this.state.members
        for (var i = 0; i < orig.length; i++) {
            if (member.name === orig[i].name) {
                orig[i].chosen = true
                orig[i].voteCount += 1
            };

        }
        this.setState({
            members: orig,
            voted: true
        })

        
    }

    handleUnvote = (e, member) => { // vote removed
        const orig = this.state.members
        for (var i = 0; i < orig.length; i++) {
            if (member.name === orig[i].name) {
                orig[i].chosen = false
                orig[i].voteCount -= 1
            };

        }
        this.setState({
            members: orig,
            voted: false
        })
        
    }

    addVote = async (o) =>{
        const url = "/api/addVote";
        try {
            const result = fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pollID: this.state.pollID, //add the poll ID here
                    option: o, //number represents which option you want to vote on 
                    user:this.state.email,
                    email:this.state.email,
                    question: this.state.question
                }),
            });
        //     console.log(`result=${JSON.stringify(result)}`);

        return result


        } catch (err) {
            console.log(`err=${err}`)
        } 
    }

    handleSubmit = async () => {
        var o = -1 // option number
        for (var i = 0; i < this.state.members.length; i++) {
            if (this.state.members[i].chosen === true) {
                o = i
            };
        }

        const answer = await this.addVote(o);
        


        this.setState({
            answerable: false,
            totalVotes: this.sumVotes()
            });
    }

    handleShowResults = () => {        
        this.setState({showResults: true})
    }

    handleReturn = () => {        
        this.setState({showResults: false})
    }




    calculatePercent = (votes, total) => {
        if (votes === 0 || total === 0) {
            return '0%'
        }
        return `${((votes / total) * 100).toFixed(0)}%`
    }


    render() {
        const { showResults, question, seconds, answerable, voted, totalVotes } = this.state
        const bars = ["RedBar", "BlueBar", "GreenBar", "YellowBar"]

        if (this.state.loading)
            return (<Spinner animation="border" variant="success"/>)
        return (
          <div >
            <div style={{padding: 10, textAlign: (answerable && !showResults) ? "center":"left"}}>
                <div style={{display: (answerable && !showResults) ? "inline-block":"block", textAlign: "left"}}>
                {this.state.members.map((member, index) => (
                    <div key={member.name}>
                        {(answerable && !showResults) ? (
                            !voted ? (
                                <div>
                                    <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleVote(e, member)}>+</button>
                                    <span >{member.name}</span>
                                </div>
                            ) : (
                                <div>
                                    {!member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleVote(e, member)} disabled>+</button>}
                                    {member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleUnvote(e, member)}>-</button>}
                                    <span>{member.name}</span>
                                </div>
                            )
                            
                        ) : (
                                <div className="result">
                                    <div style={{marginBottom: 20}}>
                                        <span className="result" > {member.name}</span>
                                        <div id="blockContainer">
                                            <div className={"ResultBar " + bars[index]} style={{width: member.voteCount > 0 ? this.calculatePercent(member.voteCount, totalVotes) : "0.1%", float: "left"}}></div>
                                            <div style={{marginTop: 4, marginRight: 40, marginLeft: 10, float: "initial"}}>{member.chosen && <Checkmark size="medium" />}</div>
                                            <div style={{marginTop: 4, marginRight: 10, position: "absolute", right: 0}}>{this.calculatePercent(member.voteCount, totalVotes)}</div>
                                        </div>
                                    </div >
                                    
                                </div>
                            )
                        }
                    </div>
                ))}
                </div>
                {voted && answerable &&  <SubmitButton style={{paddingTop: 10}} onSubmit={this.handleSubmit} />}
                {!voted && showResults &&  <ReturnButton style={{paddingTop: 10}} onSubmit={this.handleReturn} />}

                <div className="votes">
                    {`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}  
                    {!voted && !showResults &&  <ShowResultsButton style={{paddingTop: 10}} onSubmit={this.handleShowResults} />}
                </div>
            </div>
          </div>

        );
    }

}
 
class SubmitButton extends Component {
    handleClick = () => this.props.onSubmit(this.props.id);
    render() {
      return (
        <div style={{marginTop: 10}}>
          <button className="btn btn-primary" onClick={this.handleClick}>Submit</button>
        </div>
      );
    }
}

class ShowResultsButton extends Component {
    handleClick = () => this.props.onSubmit(this.props.id);
    render() {
      return (
        <div style={{marginTop: 10}}>
          <button className="btn btn-secondary btn-sm" onClick={this.handleClick}>show results</button>
        </div>
      );
    }
}

class ReturnButton extends Component {
    handleClick = () => this.props.onSubmit(this.props.id);
    render() {
      return (
        <div style={{marginTop: 10}}>
          <button className="btn btn-primary" onClick={this.handleClick}>Go Back</button>
        </div>
      );
    }
}



export default withAuth0(PollResults);