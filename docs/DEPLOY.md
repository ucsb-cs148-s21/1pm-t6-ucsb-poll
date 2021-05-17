# Deployment

1. Clone the repository
2. set up Auth0 for this app
TODO: Summarize main Instructions from cs156? 

3. cd into "myapp" and create a file called “.env.local”. This way you’ll be able to use Auth0 on localhost. That file should contain only these three lines, replacing the first set of Xs with the Auth0 domain, the second set with the Auth0 client ID, and the thrid set with the link to the heroku for this webapp:

    REACT_APP_AUTH0_DOMAIN=XXXXXXX  
    REACT_APP_AUTH0_CLIENT_ID=XXXXXXX  
    REACT_APP_AUTH0_AUDIENCE=XXXXXX 
    
4. Set up Firebase. (Create project, initialize cloud firestore, copy config details, put in server.js file)     


## Deploy To Heroku
- set up express ? 
- set environment variables for auth0
- cd in myapp & npm run build? (Trouble shooting if heroku is not working properly) 

## Running on Local Host
- cd into myapp and run: 'npm install' and then 'npm run build'
- Go back into the root project directory and run: 'npm install' and then 'npm start' to run the project on localhost:8080.
- Note: You can run the front end and back end seperately too. 


