import React, { useState, useEffect, Component } from "react";
import { Link} from "react-router-dom";
import Apoll from "../components/homePagePolls.js";
import {DropdownButton, Dropdown} from "react-bootstrap";
const BrowsePage = ({ match }) => {
    const {
      params: { filter },
    } = match;
    const [isLoading, setIsLoading] = useState(false);
    const [filterType, setFilter] = useState("Popular");

    if (filter && filterType !== filter) {
        setFilter(filter);
    }

    if (filterType !== "Recent" && filterType !== "Popular") {
        return ("Error wrong filter");
    }
  
    useEffect(() => {
      fetch(`https://swapi.dev/api/people/${personId}`, {})
        .then((res) => res.json())
        .then((response) => {
          setData(response);
          setIsLoading(false);
          console.log(`https://swapi.dev/api/people/${personId}`);
        })
        .catch((error) => console.log(error));
    }, [filterType]);
  
    return (
      <>
        {!isLoading && (
          <div>
            <h1>filter: {filter}</h1>
            <div className="container">
                <p> hello </p>
                <DropdownButton id= "dropdown-variants-info" title= {filterType} menuAlign = "right" >
                    <Dropdown.Item href="/#/browse/Popular" active = {(filterType === "Popular" ? true : false)} disabled = {(filterType === "Popular" ? true : false)} >Popular</Dropdown.Item>
                    <Dropdown.Item href="/#/browse/Recent" active = {(filterType === "Recent" ? true : false)} disabled = {(filterType === "Recent" ? true : false)} >Recent</Dropdown.Item>
                </DropdownButton>
            </div>
            <Link to="/">Back to homepage</Link>
            <Apoll />

          </div>
        )}
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
