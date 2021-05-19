import React, { Component } from 'react'
import useSWR from "swr";
import { Checkmark } from 'react-checkmark'
import { useAuth0 } from "@auth0/auth0-react";
import './NewPollResults.css' // style sheets for making polls look nice later


class PollResults extends Component {


    state = {
        members: this.props.members,
        question: this.props.question,
        seconds: this.props.seconds,
        answerable: this.props.answerable,
        voted: this.props.voted,
        pollID: this.props.pollID,
        email:this.props.email,
        totalVotes: 0,
        showResults: !(this.props.answerable), // related to show results button clicked state
        optionVotedOn: null
    }

    componentDidMount() {
        this.setState({ 
            members: this.props.members,
            question: this.props.question,
            seconds: this.props.seconds,
            answerable: this.props.answerable,
            voted: this.props.voted,
            pollID: this.props.pollID,
            email:this.props.email,
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

        return (  
        <div>
            <link
                rel="stylesheet"
                href="https://www.w3schools.com/w3css/4/w3.css"
            ></link>
            <div class="w3-row">
                <div class="w3-column">
                    <div class="w3-half w3-container" >
                        <div style={{padding: 10, textAlign: (answerable && !showResults) ? "left":"left"}}>
                            <div style={{display: (answerable && !showResults) ? "inline-block":"block", textAlign: "left"}}>
                            {this.state.members.map((member, index) => (
                                <div key={member.name}>
                                    {(answerable) ? (
                                        !voted ? (
                                            <div>
                                                <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleVote(e, member)}>+</button>
                                                <span>{member.name}</span>
                                                
                                            </div>
                                        ) : (
                                            <div>
                                            {!member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleVote(e, member)} disabled>+</button>}
                                            {member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleUnvote(e, member)}>-</button>}
                                            <span>{member.name}</span>
                                            
                                        </div>
                                        )
                                    ) : (
                                        <div>
                                            {!member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleVote(e, member)} disabled>+</button>}
                                            {member.chosen && <button className="btn btn-success btn-sm" style={{marginRight: 10, marginTop:5}} onClick={(e) => this.handleUnvote(e, member)}>-</button>}
                                            <span>{member.name}</span>
                                        </div>
                                        )
                                    }
                                </div>
                            ))}
                            </div>
                            {voted && answerable &&!this.props.voted&&  <SubmitButton style={{paddingTop: 10}} onSubmit={this.handleSubmit} />}

                        </div>
                    </div>
                </div>
                <div class="w3-column">
                    <div class="w3-half w3-container" >
                        <div style={{padding: 10, textAlign: (answerable && !showResults) ? "center":"left"}}>
                            <div style={{display: (answerable && !showResults) ? "inline-block":"block", textAlign: "left"}}>
                            {this.state.members.map((member, index) => (
                                <div key={member.name}>
                                    { showResults?(
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
                                        ):(
                                            <div>
                                            
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                            </div>
                            <div className="votes">
                                {`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}  
                                { !showResults &&  <ShowResultsButton style={{paddingTop: 10}} onSubmit={this.handleShowResults} />}
                                { showResults &&  <ReturnButton style={{paddingTop: 10}} onSubmit={this.handleReturn} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        );
    }

}

function FormatResults(votes, options, question, seconds, answerable, pollID,email,voted) {
    var members = []
    for(var x = 0; x < options.length; x++){
        var element = {
            name: options[x],
            voteCount: votes[x],
            chosen: false
        };
        members.push(element)
    }

    if (!question) return ("No question")
    if (!members) return ("No member")
    // if (!answerable) return (<PollResults
    //     members = {members} 
    //     question = {question} 
    //     seconds = {seconds} 
    //     answerable = {answerable} 
    //     pollID = {pollID} 
    //     />)


    return (<PollResults
        members = {members} 
        question = {question} 
        seconds = {seconds} 
        answerable = {answerable} 
        pollID = {pollID} 
        email={email}
        voted={voted}
        />)
}

export function GetPollResults(pollID) {
    pollID = pollID.pollID // changes pollID from object to string
    const { isAuthenticated, getAccessTokenSilently: getToken, user } = useAuth0();
    if (isAuthenticated)
        var email = user.email;
    else
        var email = "temp";

    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error } =  useSWR(
        `/getPoll/${pollID}`,
        fetcher
        );
    
    // makes sure everything necessary loads
    if (error) return ("Failed to retrieve poll")
    if (!data) return ("Loading poll")
    //if (!data.votes) return ("No votes")
    if (!data.options) return ("No options")
    if (!data.question) return ("No question")
    
    if(!(data && JSON.stringify(data))) return ("Loading again")
    
    var d = (data && JSON.stringify(data))



    d = '[' + d
    d += ']'
    d = JSON.parse(d)

    var voteArray = [];
    voteArray.push(d[0].option0);
    voteArray.push(d[0].option1);
    voteArray.push(d[0].option2);
    voteArray.push(d[0].option3);

    //const votes = d[0].votes
    const options = d[0].options
    const question = d[0].question
    const seconds = d[0].date.seconds
    const personattend=d[0].personattend
    // const answerable = d[0].answerable
    let voted=false;
    var i;
    if(personattend){
        for (i=0;i<personattend.length;i++){
            if(personattend[i].substring(1)==email){
                voted=true;
            }
        }
    }
    const dateClosed = new Date(d[0].dueDate)
    const today = new Date()
    var answerable = true
    const daysSinceClose = dateClosed - today
    if(daysSinceClose <= 0){   
        answerable = false
    } 


    return (FormatResults(voteArray, options, question, seconds, answerable, pollID,email,voted))

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



export default GetPollResults;
