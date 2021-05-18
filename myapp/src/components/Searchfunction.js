//import Autocomplete from '@material-ui/lab/Autocomplete';
// or
//import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useSWR from "swr";
const initialList = [];


export default function Searchfunc(){
  const [allpoll, setallpoll] = React.useState(initialList);
  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setallpoll(data);
      });
  const { data } = useSWR("/api/getpollforsearch", fetcher);

  
  console.log(allpoll)
  const [value, setValue] = React.useState(null);
  return(<div style={{width: 300 }}>
    <Autocomplete
      id="auto-highlight"
      options={allpoll}
      autoHighlight
      renderInput={(params) => <TextField {...params} label="Search for a poll" margin="normal" />}
    />
    
  </div>)
}