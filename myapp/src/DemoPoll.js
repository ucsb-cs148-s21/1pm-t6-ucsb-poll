
import React, { Component } from 'react';
const list = [
  {
    id: 1,
    name: 'Ortega Dining Commons',
    votes: 0
  },
  {
    id: 2,
    name: 'Carrillo Dining Commons',
    votes: 0
  },
  {
    id: 3,
    name: 'Portola Dining Commons',
    votes: 0
  },
  {
    id: 4,
    name: 'De La Guerra Dining Commons',
    votes: 0
  }
];

class DemoPoll extends Component {
  state = {
    members: []
  };

  componentDidMount() {
    this.setState({ members: list });
  }

  handleEvent = e => console.log('button clicked for ' + e);

  handleEvent = memberId => {
    const updatedList = this.state.members.map(member => {
      if (member.id === memberId) {
        return Object.assign({}, member, {
          votes: member.votes + 1
        });
      } else {
        return member;
      }
    });
  
    this.setState({
      members: updatedList
    });
  };
  render() {
    return this.state.members.map(member => (
      <DiningCom key={member.id} id={member.id} name={member.name} votes={member.votes} onVote={this.handleEvent} />
    ));
  }
}


class DiningCom extends Component {
  handleClick = () => this.props.onVote(this.props.id);
  render() {
    return (
      <div className="App">
        {this.props.name} <button onClick={this.handleClick}>+</button> {this.props.votes}
      </div>
    );
  }
}


export default DemoPoll;