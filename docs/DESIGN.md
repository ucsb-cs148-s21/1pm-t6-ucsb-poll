# System Design 

## High Level Architecture
![image](https://user-images.githubusercontent.com/33990609/118323798-08d29c80-b4b6-11eb-9611-d748b6bf3951.png)

## Details
  - The front end is built on ReactJS. It sends and receives HTTP requests following a RESTful API to the Express Server. 
  - The Express Server uses Firebase's Cloud Firestore API to get and update database information. 
  - The Firebase Database (Cloud Firestore) stores our users and polls. User documents contain information such as name, email, and past voting history. Poll documents contain all the necessary information about the question, number of votes, date created, etc. 
  - On the side, we use Auth0 to authenticate our users. Only users with an @ucsb.edu are currently allowed. AUth0 interacts with the React front end to ensure that users must be logged in to access poll creation and voting functionalities. Additionally, auth0 runs an action on every login to add the user to our user database in Firebase if the user has not been added yet. 




