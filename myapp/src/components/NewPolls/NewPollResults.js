import React, { Component } from 'react'
import useSWR from "swr";




// potential colors for results
const themes = {
    purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
    red: ['#E23D3D', '#EF4545', '#FF28283B'],
    blue: ['#5674E0', '#5674E0', '#5674E03B'],
    black: ['#303030', '#303030', '#3030303B'],
    white: ['#ffffff', '#ffffff', '#ffffff3B'],
    cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B']
  }


class PollResults extends Component {


    state = {
        members: this.props.members,
        question: this.props.question,
        seconds: this.props.seconds,
        answerable: this.props.answerable,
        voted: !(this.props.answerable)
    }

    componentDidMount() {
        this.setState({ 
            members: this.props.members,
            question: this.props.question,
            seconds: this.props.seconds,
            answerable: this.props.answerable,
            voted: !(this.props.answerable)

        });
    }


    // handleVote = e => console.log('button clicked for ' + e);
    // handleUnvote = e => console.log('button clicked for ' + e);


    handleVote = (e, member) => { // vote added
        const orig = this.state.members
        for (var i = 0; i < orig.length; i++) {
            if (member.name === orig[i].name) {
                orig[i].chosen = true
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
            };

        }
        this.setState({
            members: orig,
            voted: false
        })
        
    }

    handleSubmit = () => {
        this.setState({
            answerable: false
          });
      }



    calculatePercent = (votes, total) => {
        if (votes === 0 || total === 0) {
            return '0%'
        }
        return `${((votes / total) * 100).toFixed(2)}%`
    }


    render() {
        const { members, question, seconds, answerable, voted } = this.state
        const totalVotes = members.reduce((total, member) => total + member.voteCount, 0) // adds up all the votes
        return (
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">{question}</h2>
            </div>
            <div style={{padding: 10}}>
                {this.state.members.map(member => (
                    <div key={member.name}>
                        {answerable ? (
                            !voted ? (
                                <div>
                                    <span style={{marginRight: 20}}>{member.name}</span>
                                    <button onClick={(e) => this.handleVote(e, member)}>+</button>
                                </div>
                            ) : (
                                <div>
                                    <span style={{marginRight: 20}}>{member.name}</span>
                                    <span>{member.chosen && <button onClick={(e) => this.handleUnvote(e, member)}>-</button>}</span>
                                </div>
                            )
                            
                        ) : (
                                <div className="result">
                                    {/* <div className="fill" style={{ width: this.calculatePercent(member.voteCount, totalVotes)}}> */}
                                    <div>
                                        <span className="result" >{this.calculatePercent(member.voteCount, totalVotes)}</span>
                                        <span className="result" > {member.name}</span>
                                    </div>
                                    {/* </div> */}
                                    
                                </div>
                            )
                        }
                    </div>
                ))}
                {voted && answerable &&  <SubmitButton style={{paddingTop: 10}} onSubmit={this.handleSubmit} />}
                <div className="votes">{`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}</div>
            </div>
           
           
            <div class="card-footer">
              <small class="text-muted">Poll opened {parseInt(seconds/3600)} hours and {parseInt((seconds % 3600)/60)} minutes ago</small>
            </div>
          </div>

        );
    }

}

function FormatResults(votes, options, question, seconds, answerable) {
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
    if (!answerable) return ("No answerable")


    return (<PollResults members = {members} question = {question} seconds = {seconds} answerable = {answerable}/>)
}

export function GetPollResults(pollID) {
    pollID = pollID.pollID // changes pollID from object to string

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
    const answerable = d[0].answerable
    
    
    return (FormatResults(voteArray, options, question, seconds, answerable))

}

class SubmitButton extends Component {
    handleClick = () => this.props.onSubmit(this.props.id);
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>Submit</button>
        </div>
      );
    }
}



export default GetPollResults;
