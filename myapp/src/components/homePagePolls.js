import React, { Component } from "react";
import useSWR from "swr";
import PollResults from "./polls/PollResults.js";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
<script src="https://www.w3schools.com/lib/w3.js"></script>;

const initialList = [];
function checkbut(num) {
  if (num === "(open)") {
    return (
      <button class="w3-border-green w3-white w3-quarter w3-round-large w3-opacity">
        vote
      </button>
    );
  }
  if (num === "(close)") {
    return (
      <button class="  w3-quarter w3-round-large w3-border-indigo w3-white w3-opacity">
        result
      </button>
    );
  }
}
function RecomPoll() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>

      <div class="w3-container ">
        <header class="w3-container">
          <h1 class=" w3-extralarge"></h1>
          <h1 class="w3-threequarter w3-extralarge w3-opacity ">
            Recommended Polls
          </h1>
        </header>

        <div class="card-columns">
          <div class="card">
            <div class="w3-card-4 ">
              <header class="w3-container w3-sand">
                <h1 class="w3-large ">"Favorite topping on a pizza?"</h1>
              </header>
              <div class="w3-container ">
                <p>
                  <PollResults pollID="FFcmP1ZAsVc2eYWNNk9Y" />
                </p>
              </div>
              <footer class="w3-container ">
                <h5 class="w3-tiny">14 days ago(open)</h5>
              </footer>
            </div>
          </div>

          <div class="card">
            <div class="w3-card-4 ">
              <header class="w3-container w3-sand">
                <h1 class="w3-large">"Favorite soda drink?"</h1>
              </header>
              <div class="w3-container ">
                <p>
                  <PollResults pollID="M6qsfGs1daQlI3Luqiib" />
                </p>
              </div>
              <footer class="w3-container ">
                <h5 class="w3-tiny">16 days ago(open)</h5>
              </footer>
            </div>
          </div>
          <div class="card">
            <div class="w3-card-4 ">
              <header class="w3-container w3-sand">
                <h1 class="w3-large">What's your favorite book?</h1>
              </header>
              <div class="w3-container ">
                <p>
                  <PollResults pollID="ldWrJjKj7wPudp3ovuWO" />
                </p>
              </div>
              <footer class="w3-container ">
                <h5 class="w3-tiny">1 days ago(open)</h5>
              </footer>
            </div>
          </div>
        </div>

        <h1 class=" w3-extralarge"></h1>
      </div>
    </div>
  );
}
function Poppoll() {
  const [qlist, setqList] = React.useState(initialList);
  // const [alist, setaList] = React.useState(initialList);
  const [dlist, setdList] = React.useState(initialList);
  const [idlist, setidList] = React.useState(initialList);

  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setqList(data[0]);
        // setaList(data[1]);
        setdList(data[2]);
        setidList(data[3]);
      });
  const { data } = useSWR("/api/getPopularPollInformation", fetcher);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>

      <div class="w3-container ">
        <header class="w3-container">
          <h1 class=" w3-extralarge"></h1>
          <h1 class="w3-threequarter w3-extralarge w3-opacity ">
            Popular polls
          </h1>
          {/* <button class="w3-large w3-quarter w3-round-large w3-opacity" >
            view all
          </button> */}
          <Button href = "/#/browse/Popular" variant="link">View All</Button>

        </header>

        <div class="card-columns">
          {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i}>
              <div class="card">
                <div class="w3-card-4 ">
                  <header class="w3-container w3-pale-green">
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
              </div>
          ))}
        </div>

        <h1 class=" w3-extralarge"></h1>
      </div>
    </div>
  );
}

function Repoll() {
  const [qlist, setqList] = React.useState(initialList);
  // const [alist, setaList] = React.useState(initialList);
  const [dlist, setdList] = React.useState(initialList);
  const [idlist, setidList] = React.useState(initialList);

  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //console.log("data: ", data);
        setqList(data[0]);
        // setaList(data[1]);
        setdList(data[2]);
        setidList(data[3]);
      });
  const { data } = useSWR("/api/getRecentPollInformation", fetcher);
  console.log(qlist);
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://www.w3schools.com/w3css/4/w3.css"
      ></link>

      <div class="w3-container ">
        <header class="w3-container">
          <h1 class=" w3-extralarge"></h1>
          <h1 class="w3-threequarter w3-extralarge w3-opacity ">
            Recent polls
          </h1>
          {/* <button class="w3-large w3-quarter w3-round-large w3-opacity">
            view all
          </button> */}
          <Button href = "/#/browse/Recent" variant="link">View All</Button>

        </header>

        <div class="card-columns">
          {[0, 1, 2, 3, 4, 5].map(i => (
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

        <h1 class=" w3-extralarge"></h1>
      </div>
    </div>
  );
}

function Apoll() {
  return (
    <div>
      <RecomPoll />
      <Poppoll />
      <Repoll />
    </div>
  );
}

export default Apoll;
