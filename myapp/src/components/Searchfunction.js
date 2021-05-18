//import Autocomplete from '@material-ui/lab/Autocomplete';
// or
//import { Autocomplete } from '@material-ui/lab';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useSWR from "swr";
import { Link } from 'react-router-dom'
const initialList = [];
let id=[];
let poll=[];

class Searchfunction extends Component{
  state={
    allpoll:this.props.allpoll,
    idlist:this.props.idlist,
    selected:"",
    selectornot:0,
  }
  componentDidMount() {
    this.setState({ 
      allpoll:this.props.allpoll,
      idlist:this.props.idlist,
      selected:"",
      selectornot:0,
    });
  }
  savedata=(value)=>{//save what user selected
    this.setState({selected:value})
    this.setState({selectornot:1})
  }
    render() {
      return(
      <div>
      <div style={{width: 300 }}>
        
        <Autocomplete
          onChange={(event, value) => this.savedata(value)}
          
          id="auto-highlight"
          options={this.state.allpoll}
          autoHighlight
          renderInput={(params) => <TextField {...params} label="Search for a poll" margin="normal" />}
          /* following part of code can make a search function in a blank box (which is the same size as that one in the navigation bar)
          renderInput={(params) => (
            <div ref={params.InputProps.ref} >
              <input style={{ width: 200 }} type="text" {...params.inputProps} />
            </div>
          )}
          */
        />
      
      {this.state.selectornot?(<Link to={"poll/"+(this.state.idlist[this.state.allpoll.indexOf(this.state.selected)]+"") }>search</Link>):(<div></div>)}
      </div>
      </div>);
    }
}






export default function Searchfunc(){
  const [allpoll, setallpoll] = React.useState(initialList);
  const [idlist, setidList] = React.useState(initialList);
  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setallpoll(data[0]);
        setidList(data[1])
      });
  const { data } = useSWR("/api/getpollforsearch", fetcher);

  const [value, setValue] = React.useState(null);
  id=idlist;
  poll=allpoll;
  
  return(<Searchfunction allpoll={poll} idlist={id}/>)
}