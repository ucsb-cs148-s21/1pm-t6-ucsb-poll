# System Design 

## High Level Architecture
![image](https://user-images.githubusercontent.com/33990609/118323798-08d29c80-b4b6-11eb-9611-d748b6bf3951.png)

## Overview
  - The user interacts with a ReactJS front end Webapp. The ReactJS front end interacts with Auth0 and an Express server (hosted on localhost or heroku) to authenticate and fetch users. The server interacts with a Firebase database to get and update information about polls and users. 


## Details
  - The front end is built on ReactJS. It sends and receives HTTP requests following a RESTful API to the Express Server. 
  - The Express Server uses Firebase's Cloud Firestore API to get and update database information. 
  - The Firebase Database (Cloud Firestore) stores our users and polls. User documents contain information such as name, email, and past voting history. Poll documents contain all the necessary information about the question, number of votes, date created, etc. 
  - On the side, we use Auth0 to authenticate our users. Only users with an @ucsb.edu are currently allowed. Auth0 interacts with the React front end to ensure that users must be logged in to access poll creation and voting functionalities. Additionally, auth0 runs an action on every login to add the user to our user database in Firebase if the user has not been added yet. 

## Design Process Documentation 
We decided to use React stack early on during on [first spring planning](https://github.com/ucsb-cs148-s21/1pm-t6-ucsb-poll/blob/main/team/sprint01/4-14.md). 

Most major decisions occured in our [spring 2 planning meeting](https://github.com/ucsb-cs148-s21/1pm-t6-ucsb-poll/blob/main/team/sprint02/sprint02.md). 
  - Deciding to use Node.js instead of Springboot
  - Deciding to use Firebase instead of MongoDB
  - Deciding on using Auth0 instead of Firebase authentication
  - Deciding on having Admin/Member

Design document created during [lab](https://github.com/ucsb-cs148-s21/1pm-t6-ucsb-poll/blob/main/team/sprint03/lec13.md). 

## UX Consideration
Most UX decision occured as they came up (people working on features would suggest and confirm with the group). 
- We decided to make polls only votable by UCSB students
- We decided that the public could see our vote
- We decided that you could only vote once, but you can see the results before voting if you want to. 

Additionally, we decided to improve upon and make major UI choices as a result of our [retro 2](https://github.com/ucsb-cs148-s21/1pm-t6-ucsb-poll/blob/main/team/retrospectives/RETRO_02.md). We later had discussions on slack relating to poll UIs. 

We created the following user flow diagram: 
![image](https://user-images.githubusercontent.com/33990609/121289322-9927b580-c899-11eb-8236-f24c3c6575db.png)




