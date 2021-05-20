//import Autocomplete from '@material-ui/lab/Autocomplete';
// or
//import { Autocomplete } from '@material-ui/lab';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useSWR from "swr";
import { Link } from 'react-router-dom'
import {  Nav,  Form,Button} from 'react-bootstrap';

const initialList = [];
//window.pollid="";

class Searchfunction extends Component{
  state={
    poll:this.props.poll,
    list:this.props.list,
    selected:"",
    selectornot:0,
  }
  componentDidMount() {
    this.setState({ 
      poll:this.props.poll,
      list:this.props.list,
      selected:"",
      selectornot:0,
    });
  }
  savedata=(value)=>{//save what user selected
    this.setState({selected:value})
    this.setState({selectornot:1})
  }
  setlink=(value)=>{
    window.pollid=value
    //console.log(value)
    //console.log(window.pollid)
  }
    render() {
      return(
      <div>
      
      <div style={{width: 300 }}>
        <Autocomplete
          noOptionsText={'loading'}
          onChange={(event, value) => this.savedata(value)}
          id="auto-highlight"
          options={this.props.poll}
          autoHighlight
          renderInput={(params) => <TextField {...params}  label="Search for a poll" variant="outlined" size="small" />}
          // following part of code can make a search function in a blank box (which is the same size as that one in the navigation bar)
         /* renderInput={(params) => (
            <div ref={params.InputProps.ref} >
              <input style={{ width: 200 }} type="text" {...params.inputProps} />
            </div>
        
          )}
*/
        />
        {/*this.state.selectornot?(<Link to={"/poll/"+(this.props.list[this.props.poll.indexOf(this.state.selected)]+"") }>search</Link>):(<div></div>)*/}
          
          {this.setlink(this.props.list[this.props.poll.indexOf(this.state.selected)]+"")}
        </div>
        <Buttonfunc link={"/#/poll/"+(this.props.list[this.props.poll.indexOf(this.state.selected)]+"")}/>
      </div>);
    }
}
class Buttonfunc extends Component{
  state={
  link:this.props.link
  }
  componentDidMount() {
    this.setState({ 
      link:this.props.link
    });
  }
  render(){
  return(<Button variant="outline-success" href={this.props.link}>Search</Button>)
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
  
  let poll=allpoll
  let list=idlist
  return(<Searchfunction poll={poll} list={list}/>)
}