import styles from './style.css'
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

const themes = {
    purple: ['#6D4B94', '#7C6497', '#6D4B943B'],
    red: ['#E23D3D', '#EF4545', '#FF28283B'],
    blue: ['#5674E0', '#5674E0', '#5674E03B'],
    black: ['#303030', '#303030', '#3030303B'],
    white: ['#ffffff', '#ffffff', '#ffffff3B'],
    cyan: ['#00BCDD', '#00BCDD', '#00BCDD3B']
  }

class DemoPoll extends Component {
  state = {
    members: [],
    voted: false,
    submitted: false,
    totalVotes: 0
  };

  componentDidMount() {
    this.setState({ members: list });
  }

  handleEvent = e => console.log('button clicked for ' + e);

  handleEvent = memberId => {
    const updatedList = this.state.members.map(member => {
      if (member.id === memberId) {
        return Object.assign({}, member, {
          votes: member.votes + 1,
        });
      } else {
        return member;
      }
    });
    

    this.setState({
      members: updatedList,
      voted: true
    });


    const { members } = this.state
    const totalVotes = members.reduce((total, member) => total + member.votes, 1)
    this.setState({
        totalVotes: totalVotes
      });

  };

  handleSubmit = () => {
    this.setState({
        submitted: true
      });
  }


  calculatePercent = (votes, total) => {
    if (votes === 0 || total === 0) {
      return '0%'
    }
    return `${parseInt((votes / total) * 100)}%`
  }

  obtainColors = (customTheme) => {
    const colors = themes[customTheme]
    if (!colors) {
      return themes['black']
    }
    return colors
  }


  render() {
    const { voted, totalVotes, submitted } = this.state
    const colors = this.obtainColors('blue')

    return (
        <div style={{padding: 10}}>
            {this.state.members.map(member => (
                <div key={member.name}>
                    {!submitted ? (
                        <DiningCom key={member.id} id={member.id} name={member.name} votes={member.votes} onVote={this.handleEvent} />
                    ) : (
                        <div className={styles.result} style={{ color: colors[2], borderColor: colors[1] }}>
                          <div className={styles.fill} style={{ width: this.calculatePercent(member.votes, totalVotes), backgroundColor: colors[2] }} />
                          <div>
                              <span className={styles.percent} style={{ color: colors[0] }}>{this.calculatePercent(member.votes, totalVotes)}</span>
                              <span className={styles.answer} style={{ color: colors[0] }}> {member.name}</span>
                          </div>
                          
                        </div>
                    )}
                </div>
            ))}
            {voted && !submitted &&  <SubmitButton onSubmit={this.handleSubmit} />}
            <p style={{paddingTop: 40, paddingBottom: 0, marginBottom: 0, color: "gray"}}>{`${totalVotes} vote${totalVotes !== 1 ? 's' : ''}`}</p>
        </div>
    );
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


export default DemoPoll;
