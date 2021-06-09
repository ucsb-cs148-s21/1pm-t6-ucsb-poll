# 1pm-t6-ucsb-poll
Allows anyone with a UCSB email to vote on virtually anything. 
Techstack: React / Node.js / (Express) / Firebase


UCSB Polls will give information on what the student body's favorite beer is, what their favorite class was, what their favorite restaurant in IV is, etc. Users should be able to log in with their @ucsb.edu account and then vote and share different polls. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Users:
- Users that look up, create, and vote on polls
- Admins can remove polls to the system (Not added yet) 

# Members
- Jasun Chen @jasunchen
- Daniel Lohn @DLohn
- TT Luo @Randp
- Zhengying Li @zhengyingl
- Daniel Shamtob @dshamtob

# Repository Structure

The backend is in the root directory under server.js.

Our meeting logs are in the 'team' folder and our documents in the 'docs' folder.

The frontend is in the myapp folder:
- Contains all components and pages under the 'src' folder.
- The entire website is hosted on index.js which calls App.js.
- App.js calls NavigationBar.js and Main.js, which is used as a router for the pages on the website.

The src folder contains three main folders:
- A 'components' folder which includes page components making up the webpages.
- An 'auth' folder for user authentication.
- A 'pages' folder for the pages on the website.
- A 'tests' folder for tests but we decided not to pursue TDD for this project. 

# Installation

Prerequisites: Javascript, Node.js, express 

# Dependencies
- @auth0/auth0-react for auth0 setup
- bootstrap/react-bootstrap for bootstrapping the webapp
- swr for linking to server
- react/react-scripts for front end
- firebase for database
   
# Installation Steps

[Deployment Instructions](./docs/DEPLOY.md)


# Functionality

[User Manual](./docs/MANUAL.md)
- Click the login button in the top right corner of the webpage to login through Auth0.
- Navigate to "Create a Poll" under "Polls" in the navigation bar. Create your own poll!
- Go back to the home page (Or browse polls by recent). You can see your own poll (click on it, vote on it, etc)

# Design Documentation

[Design Document](./docs/DESIGN.md)

# Known Problems

- Code is messy (still some bugs left over) 
- Authentication not ideally secure (api is not secure)
- No anonymity yet 
- Should switch to Firebase's bulit in authentication service ideally (but auth0 works for now)
- No moderation implemented yet


# Contributing

Fork it!
Create your feature branch: git checkout -b my-new-feature  
Commit your changes: git commit -am 'Add some feature'  
Push to the branch: git push origin my-new-feature  
Submit a pull request :D

# Deployment

View our [Heroku Deployment](https://cs148-1pm-t6-ucsb-poll.herokuapp.com/).

# Final Presentation 

https://youtu.be/H-vttr9SO-A

