# Deployment

- **Clone the repository**
    ```
    git clone git@github.com:ucsb-cs148-s21/1pm-t6-ucsb-poll.git
    ```
- **Set up Auth0 credentials for this app**
    obtain OAuth 2.0 client credentials from the Google API Console [Google API Console](https://console.developers.google.com/)
    Create an Auth0 account if you don't already have one.
    Set up an Auth0 tenant for this webapp.
        
<!-- TODO: Summarize main Instructions from cs156? -->
- **Set up app with Auth0 credentials**
    cd into "myapp" and create a file called “.env.local”. This way you’ll be able to use Auth0 on localhost. That file should contain only these three lines, replacing the first     set of Xs with the Auth0 domain, the second set with the Auth0 client ID, and the thrid set with the link to the heroku for this webapp:

        REACT_APP_AUTH0_DOMAIN=XXXXXXX  
        REACT_APP_AUTH0_CLIENT_ID=XXXXXXX  
        REACT_APP_AUTH0_AUDIENCE=XXXXXX 
- **Set up Firebase**Set up Firebase. (Create project, initialize cloud firestore, copy config details, put in server.js file)     
    Create a new project on Firebase.
    Initialize cloud firestore for this project.
    Firebase will provide a set of config details, copy these.
    Insert these credentials at the beginning of the server.js file.
    
- **Deploy To Heroku**
<!--- set up express ? -->
    Push repository to GitHub and link to a new Heroku webapp.
    Input environment variables for Auth0.
<!--- - cd in myapp & npm run build? (Trouble shooting if heroku is not working properly) -->

- **Running on Local Host**
    cd into myapp and run: 'npm install' and then 'npm run build'
    Go back into the root project directory and run: 'npm install' and then 'npm start' to run the project on localhost:8080.
    Note: You can run the front end and back end seperately too. 


