import React, { useState, useEffect, Component } from "react";
import { Link} from "react-router-dom";
import {DropdownButton, Dropdown} from "react-bootstrap";
import PollResults from "../components/polls/PollResults.js";

const BrowsePage = ({ match }) => {
    const {
      params: { filter },
    } = match;
    const [isLoading, setIsLoading] = useState(false);
    const [filterType, setFilter] = useState("Popular");
    const [qlist, setqList] = useState([]);
    const [dlist, setdList] = useState([]);
    const [idlist, setidList] = useState([]);

    const [arrayOfNums, setArrayOfNums] = useState([0,1,2,3,4,5,6,7,8,9,10,11]);
    const [numOfPolls, setNumOfPolls] = useState(12);

    if (filter && filterType !== filter) {
        setFilter(filter);
    }
  
    useEffect(() => {
      fetch(`/api/getPollInformation/${filterType}/12`)
        .then((res) => res.json())
        .then((data) => {
            setqList(data[0]);
            setdList(data[2]);
            setidList(data[3]);
            //setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }, [filterType]);

    if (filterType !== "Recent" && filterType !== "Popular") {
        return ("Error wrong filter");
    }

    // const fetcher = (url) => fetch(url).then((res) => res.json())
    // const { data } = useSWR(`/api/getPollInformation/${filterType}/12`, fetcher);
    // //dynamically update the list of recent polls
    // if (data && qlist[0] !== data[0][0]) {
    //   setqList(data[0]);
    //   setdList(data[2]);
    //   setidList(data[3]);
    // }
  
    return (
      <>
          <div>
            <h1>filter: {filter}</h1>
            <div className="container">
                <p> hello </p>
                <DropdownButton id= "dropdown-variants-info" title= {filterType} menuAlign = "right" >
                    <Dropdown.Item href="/#/browse/Popular" active = {(filterType === "Popular" ? true : false)} disabled = {(filterType === "Popular" ? true : false)} >Popular</Dropdown.Item>
                    <Dropdown.Item href="/#/browse/Recent" active = {(filterType === "Recent" ? true : false)} disabled = {(filterType === "Recent" ? true : false)} >Recent</Dropdown.Item>
                </DropdownButton>
            </div>

            <div>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <div class="w3-container ">
                    <header class="w3-container">
                    <h1 class=" w3-extralarge"></h1>
                    <h1 class="w3-threequarter w3-extralarge w3-opacity ">
                        {filterType} polls
                    </h1>
                    </header>
                    <div class="card-columns">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                            <div class="card">
                                <div class="w3-card-4 ">
                                    <header class="w3-container w3-light-blue">
                                    <Link to={"/poll/"+idlist[i]}>
                                        <h1 class="w3-large ">{qlist[i]}</h1>
                                    </Link>
                                    </header>
                                    <div class="w3-container ">
                                    <p>
                                        <PollResults pollID={(idlist[i] + "").substring(1, 21)} />
                                    </p>
                                    </div>
                                    <footer class="w3-container ">
                                    {(dlist[i] > 0) ? 
                                        <h5 class="w3-tiny">Closing in {dlist[i]} days</h5> : 
                                        <h5 class="w3-tiny">Closed {-(dlist[i])} days ago</h5>
                                    }
                                    </footer>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
      </>
    );
  };
  

// class BrowsePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       posts: []
//     };
//   }

//   render() {
//     const { posts } = this.state;
//     return (
//       <div className="container">
//         <link
//         rel="stylesheet"
//         href="https://www.w3schools.com/w3css/4/w3.css"
//         ></link>
//         <div class="jumbotron">
//         <h1 class="display-4">Browse polls</h1>
//         </div>
//         <Apoll />
        
//       </div>
//     );
//   }
// }
export default BrowsePage; 
