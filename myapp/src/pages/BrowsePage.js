import React, { useState, useEffect, Component } from "react";
import { Link} from "react-router-dom";
import {DropdownButton, Dropdown} from "react-bootstrap";
import PollResults from "../components/polls/PollResults.js";
import Button from 'react-bootstrap/Button'
const BrowsePage = ({ match }) => {
    const {
      params: { filter },
    } = match;
    const [isLoading, setIsLoading] = useState(false);
    const [filterType, setFilter] = useState("Popular");
    const [qlist, setqList] = useState([]);
    const [dlist, setdList] = useState([]);
    const [idlist, setidList] = useState([]);

    const [arrayOfNums, setArrayOfNums] = useState([0,3,6,9]);
    const [numOfPolls, setNumOfPolls] = useState(12);
    const [isLoadingMorePolls, setIsLoadingMorePolls] = useState(false);


    if (filter && filterType !== filter) {
        setFilter(filter);

        //reset num of polls displayed
        setArrayOfNums([0,3,6,9]);
        setNumOfPolls(12);
    }
  
    useEffect(() => {
        setIsLoadingMorePolls(true);
        fetch(`/api/getPollInformation/${filterType}/${numOfPolls}`)
        .then((res) => res.json())
        .then((data) => {
            setqList(data[0]);
            setdList(data[2]);
            setidList(data[3]);
            //setIsLoading(false);
            setIsLoadingMorePolls(false);

        })
        .catch((error) => console.log(error));
    }, [filterType, numOfPolls]);

    if (filterType !== "Recent" && filterType !== "Popular") {
        return ("Error wrong filter");
    }

 
    const handleClick = () => {
        setIsLoadingMorePolls(true);
        var arr = arrayOfNums;
        var num = numOfPolls;
        var i;
        for (i = 0; i < 4; i++) {
            arr.push(num+i*3);
        }
        setArrayOfNums(arr);
        setNumOfPolls(num+12);
    } 
    
  
    return (
      <>
          <div>
            <h1>Browse Polls</h1>
            <div className="container">
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

                        {arrayOfNums.map(i => (
                            <div class="card-deck">

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

                                <div class="card">
                                    <div class="w3-card-4 ">
                                        <header class="w3-container w3-light-blue">
                                        <Link to={"/poll/"+idlist[i+1]}>
                                            <h1 class="w3-large ">{qlist[i+1]}</h1>
                                        </Link>
                                        </header>
                                        <div class="w3-container ">
                                        <p>
                                            <PollResults pollID={(idlist[i+1] + "").substring(1, 21)} />
                                        </p>
                                        </div>
                                        <footer class="w3-container ">
                                        {(dlist[i] > 0) ? 
                                            <h5 class="w3-tiny">Closing in {dlist[i+1]} days</h5> : 
                                            <h5 class="w3-tiny">Closed {-(dlist[i+1])} days ago</h5>
                                        }
                                        </footer>
                                    </div>
                                </div>


                                <div class="card">
                                    <div class="w3-card-4 ">
                                        <header class="w3-container w3-light-blue">
                                        <Link to={"/poll/"+idlist[i+2]}>
                                            <h1 class="w3-large ">{qlist[i+2]}</h1>
                                        </Link>
                                        </header>
                                        <div class="w3-container ">
                                        <p>
                                            <PollResults pollID={(idlist[i+2] + "").substring(1, 21)} />
                                        </p>
                                        </div>
                                        <footer class="w3-container ">
                                        {(dlist[i] > 0) ? 
                                            <h5 class="w3-tiny">Closing in {dlist[i+2]} days</h5> : 
                                            <h5 class="w3-tiny">Closed {-(dlist[i+2])} days ago</h5>
                                        }
                                        </footer>
                                    </div>
                                </div>

                            </div>

                        ))}
                    
                    <div style = {{textAlign: "center"}}>
                    <Button
                        variant="primary"
                        disabled={isLoadingMorePolls}
                        onClick={!isLoadingMorePolls ? handleClick : null}
                    >
                              {isLoadingMorePolls ? 'Loading…' : 'Load More Polls'}
                    </Button>   
                    </div>
                </div>
            </div>
          </div>
      </>
    );
  };
  

 
export default BrowsePage; 
