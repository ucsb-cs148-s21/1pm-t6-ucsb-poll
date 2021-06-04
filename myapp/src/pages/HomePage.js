import React, { Component } from "react";
import NewVote from "../components/polls/NewVote";
import HomePagePolls from "../components/homePagePolls.js";
import { useAuth0 } from "@auth0/auth0-react";
import { authorize } from "passport";
// import bgimage from '../image_background.png'

//fix display for create a new poll
const imgurl = "https://www.ucsb.edu/sites/default/files/images/home/UC-Santa-Barbara-Henley-Gate-Hero-700.jpg"
//const imgurl = "https://centralcoastdatascience.org/sites/default/files/styles/big_banner_desktop/public/2020-02/ucsb-banner.jpg?h=1f842c8e&itok=2ixkf1w7"
// const imgurl = "https://ucsbaccesscard.com/UCSB-1.png"
/*
backgroundSize: "700px 500px", 
*/
const HomePage = () => {
  const { isAuthenticated } = useAuth0();
    return (
      <div>
        <div class="jumbotron jumbotron-fluid" style= {{ backgroundImage: `url(${imgurl})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: 350, backgroundPosition: "center",
}}>
          <div style = {{background:"", display: "inline-block", fontWeight: 800}}>
            <h1 class="display-4" style = {{fontWeight: 800, color: "white"}}>Welcome to UCSB Polls</h1>
          </div>
          {/* <h5 style = {{fontWeight: 800, color: "white"}}> Create and Vote on Polls </h5> */}
        </div>
        <div className="container">
          <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
          ></link>

          <HomePagePolls />

          {isAuthenticated &&
            <div class="card">
              <div class="card-header">Create a New Poll</div>
              <NewVote />
            </div>
          }
          
        </div>
      </div>
    );
  
}
export default HomePage; 
