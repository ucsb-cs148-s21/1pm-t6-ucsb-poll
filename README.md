# 1pm-t6-ucsb-poll
Allows anyone with a UCSB email to vote on virtually anything. 
Techstack: React / Node.js / (Express) / Firebase


UCSB Polls will give information on what the student body's favorite beer is, what their favorite class was, what their favorite restaurant in IV is, etc. Users should be able to log in with their @ucsb.edu account and then vote and share different polls. 

Users:
- Users that look up, create, and vote on polls
- Admins can remove polls to the system

# Members
- Jasun Chen @jasunchen
- Daniel Lohn @DLohn
- TT Luo @Randp
- Zhengying Li @zhengyingl
- Daniel Shamtob @dshamtob


# Installation

Prerequisites: Javascript, Node.js, express 

# Dependencies
- @auth0/auth0-react for auth0 setup
- bootstrap/react-bootstrap for bootstrapping the webapp
- swr for linking to server
- react/react-scripts for front end
- firebase for database
   
# Installation Steps
- Clone the repository
- set up Auth0 for this app
- cd into "myapp" and create a file called “.env.local”. This way you’ll be able to use Auth0 on localhost. That file should contain only these three lines, replacing the first set of Xs with the Auth0 domain, the second set with the Auth0 client ID, and the thrid set with the link to the heroku for this webapp:

    REACT_APP_AUTH0_DOMAIN=XXXXXXX 
    REACT_APP_AUTH0_CLIENT_ID=XXXXXX 
    REACT_APP_AUTH0_AUDIENCE=XXXXXX 


- cd into myapp and run: 'npm install' and then 'npm run build'
- Go back into the root project directory and run: 'npm install' and then 'npm start' to run the project on localhost:8080. 


# Functionality
TODO: Write usage instructions. Structuring it as a walkthrough can help structure this section, and showcase your features.

- click the login button in the top right corner of the webpage to login through Auth0.
- create a poll using the interface at the bottom of the page
- vote on the newly created poll (it will be listed under recent polls) 

# Known Problems
- Code is very messy for the front page. We will combine some of the code into one file to make the components more clear. 

# Contributing

Fork it!
Create your feature branch: git checkout -b my-new-feature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin my-new-feature
Submit a pull request :D

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


