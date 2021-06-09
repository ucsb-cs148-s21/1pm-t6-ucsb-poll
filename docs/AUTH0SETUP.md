# ./docs/AUTH0SETUP.md

Instructions based on instructions from [UCSB CS156](https://github.com/ucsb-cs156-w21/STARTER-jpa03/blob/main/docs/SETUP-FULL.md)
. 

## Step 0: Get Organized

You are going to need to keep track of a few values that you are going
to need to copy/paste into various places.  

Therefore, we suggest that you copy and paste the following table
into a file in your editor, and fill in the values on the right hand side as we define them.  We'll call this: `temp-credentials.txt`

Example `temp-credentials.txt`
```
heroku.app:
heroku.url:
auth0.tenant:
auth0.domain:
auth0.clientId: 
google.clientId:
google.clientSecret:
```


## Step 1: Choose an application name.

Login to Heroku.com and choose an application name. You can select something like "ucsb-polls-id" with your own id. 

Enter this into Heroku.com to create a new application as shown below.  

If your app name is, for example, `ucsb-polls-id`, then the eventual URL of this application is now, for example `https://ucsb-polls-id.herokuapp.com`

![Create new app on Heroku](./images/heroku-new-app.gif)

Then enter this name for the value `heroku.app` in your `temp-credentials.txt`, and enter the full url for `heroku.url`
so that the file looks something like this:

```
heroku.app: ucsb-polls-id
heroku.url: https://ucsb-polls-id.herokuapp.com
auth0.tenant: 
auth0.domain:
auth0.clientId: 
```

## Step 2: Create an Auth0.com Account and/or Tenant

Creating an Auth0 account is a one-time setup step.

To set up Auth0, visit <https://auth0.com> and sign in / make your own account. 

Create your own tenant if you haven't. Tenants simply group together related applications. 

Put the name for your tenant (e.g. 'cs148-ucsb-polls-id') into your temp file. 

```
heroku.app: ucsb-polls-id
heroku.url: https://ucsb-polls-id.herokuapp.com
auth0.tenant: cs148-ucsb-polls-id
auth0.domain:
auth0.clientId: 
```

## Step 3: Set up new Auth0 application

The next step is to set up a new Auth0 application.  While logged in to Auth0.com, with the correct tenant selected, navigating to the "Applications" page in the sidebar and clicking the
"Create Application" button. 

Name your application that same thing as you named your heroku application
(e.g. when you put in a name, make it the same name as what you put
in for `heroku.app` in your `temp-credentials.txt`.

Select "Single Page Application" as the application type, and click "Create".

You'll be shown a screen under the "Quick Start" tab where it asks you to
select what technology you are using. *You may skip this step*.

Instead, in the configuration for the application you just created, click on the "Settings" tab and scroll down to the section with the heading `Application URIs`, and fill in the following values
in the appropriate fields.  


| Field                 | Value                                        |
| --------------------- | -------------------------------------------- |
| Allowed Callback URLs | http://localhost:3000, http://localhost:8080, https://ucsb-polls-id.herokuapp.com |
| Allowed Logout URLs   | http://localhost:3000, http://localhost:8080, https://ucsb-polls-id.herokuapp.com |
| Allowed Web Origins   | http://localhost:3000, http://localhost:8080, https://ucsb-polls-id.herokuapp.com |


Make sure to scroll down and click "Save Changes" at the bottom of the page.

Now, in the "Connections" tab of **your app** (not from the sidebar)

- Uncheck Username-Password-Authentication.
- Ensure `google-oauth2` is checked (it should be by default).
  See image below for an example of what it should look like.

![Auth0 Connections Settings](./images/auth0-connections-settings.png)

Next, go back to the Settings tab of your app (the same tab where you entered the callback URIs).   

At this point, you should be able to find the value for for `Domain` and `Client ID`, and use these to fill in the values for
`auth0.domain` and `auth0.clientId` in your  `temp-credentials.txt` file.  


* The value of the `Domain` field should be something like  `ucsb-cs156-cgaucho.us.auth0.com`, where `ucsb-cs156-cgaucho` is the name of your Auth0 tenant.     
  - Copy this value into your `temp-credentials.txt` file as the value for `auth0.domain`.  
* The value of the `Client ID` field should be a alphanumeric string, something like: `6KoPsWMM2A27PjAejHHWTXApra8CVQ6C`.  
- Copy this value into your `temp-credentials.txt` file as the value for `auth0.clientid`. 

Your `temp-credentials.txt` file should now look something like this:

```
heroku.app: ucsb-polls-id
heroku.url: https://ucsb-polls-id.herokuapp.com
auth0.tenant: cs148-ucsb-polls-id
auth0.domain: cs148-ucsb-polls-id.auth0.com
auth0.clientid: 6KoPsWMM2A27PjAejHHWTXApra8CVQ6C
google.clientId:
google.clientSecret: 
```

## Step 4: Set up an API under Auth0

The next step is to create an API under Auth0.  To do this, 
go to the sidebar in Auth0, and locate the `APIs` tab.

You should see (at least) one API listed, namely the `Auth0 Management API`. This API is used to manage all other APIs, so we'll create an API that is specific to just our application.

First, click on the `Create API` button.

Next, fill in the fields as follows:
| Field name | Value | Description |
|------------|-------|-------------|
| Name | The name of your application | This is just a visual name for the Auth0 API of your application, and in principle it could be anything.  But to help keep things organized, we'll use the same value that we used for the `heroku.app`,   Example `ucsb-polls-id`|
| Identifier | Copy your full heroku url into this field; e.g. `https://ucsb-polls-id.herokuapp.com` | This will end up serving as the "audience" value, the "key" that identifies custom claims in the JWT token. |
| Signing algorithm | RS256 | This determines what cryptographic algorithm is used to verify tokens. The standard is RS256, so we use that here |

It should end up looking like the below image (with your application name):


![Auth0 API setup](./images/auth0-api-setup.png)

Hit `Create` to create your API.

## Step 5: Set up new Google OAuth Application (once per Auth0 tentant)


Because UCSB uses Google Gmail as an email provider for all students, staff and faculty, we can depend on the fact that every member of the UCSB community has the ability to authenticate through Google.  For that reason, we use Google Authentication via a protocol called "OAuth" in many appllications we develop in this course.

To get started with Google Authentication, you need to login with a Google Account; for a variety of reasons, we suggest that you use your UCSB Google Account for this purpose.  

* Here's why: the course staff are in a better position to help you troubleshoot when we are able to look up your
username--which we can do with your UCSB username.

The instructions below are based on the instructions <a href="https://developers.google.com/identity/sign-in/web/sign-in" target="_blank">here</a>.

You'll need the values from your `temp-credentials.txt` file for:
* `heroku.app` (e.g. `ucsb-polls-id`)
* `auth0.tenant` (e.g.`cs148-ucsb-polls-id`) 
* `auth0.domain` (e.g. `cs148-ucsb-polls-id.us.auth0.com`)
so, have those handy.

1. Navigate to page <a href="https://developers.google.com/identity/sign-in/web/sign-in" target="_blank">Google OAuth Instructions</a> and click where it says "Go to the Credentials Page".
2. When you land on this page, if you haven't already done so, 
   click as shown in the following animation to
   create a new project.   Please call your project `cmpsc156-yourUCSBNetID`, and for the "location", select `ucsb.edu`, then `UnPaid`, as shown here:

   ![New Google API Project](./images/google-api-create-new-project.gif)  

   Or, if you already have a `cmpsc156-yourUCSBNetID` project, select that
   project.
2. Click `Create credentials > OAuth client ID.`
3. For the `User Type`, click `Internal` then click `Create`
4. For the `App Name`, enter your the value you chose for `heroku.app`, e.g. `ucsb-polls-id` 
5. For the `User Support Email` and `Developer Contact Info` put in your own `@ucsb.edu` email address. You can leave the other fields with their default values.
6. There is a button to "Add or Remove Scopes".  Please click the buttons beside `auth/userinfo/email` and `auth/userinfo/profile`, then click `Update`
7. Return to the screen where you can click to  `Create credentials > OAuth client ID.`
8. You should now be asked to select an application type; choose `Web application`
9. Name your OAuth 2.0 client using the same name as your `auth0.tenant` (e.g. `cs148-ucsb-polls-id`).   Since you only need one client per Auth0 tenant, it makes sense to give these the same name.
10. Add an authorized JavaScript origin with the value `https://insert-your-auth0-domain-here`, substituting in the value of `auth0.domain` prefixed with `https://`, e.g. `https://cs148-ucsb-polls-id.us.auth0.com`
11. Add an authorized redirect URI, with the value `https://insert-your-auth0-domain-here/login/callback`, substituting in the value of `auth0.domain` prefixed with `https://`, and suffixed with `/login/callback/` e.g. `https://cs148-ucsb-polls-id.us.auth0.com/login/callback` 
   It should look something like this:
   ![](./images/google-create-oauth-client.png)
12. Scroll down and click "Create" to create your Google OAuth App.
13. You should see a pop-up with a "Client ID" and "Client Secret". Copy these values into your  `temp-credentials.txt` as the values of 
`google.clientId` and `google.clientSecret`.  You'll need these in a later step.

## Step 6: Set up new Auth0 Social Login Connection (once per Auth0 tentant)

Now, return to the browser tab open to your Auth0 application.

- One point to clear up: There are two client id and client secret pairs floating around here; one for the Auth0 application, and another for the Google API.  Don't be confused. Right now, we are working with the Google client id and client secret.
- Navigate to the "Connections -> Social" page in the sidebar of the Auth0.com web interface, as shown in the image below.
- Click on "Google" and fill in the "Client ID" and "Client Secret" from the values of `google.clientId` and `google.clientSecret` that you put into your  `temp-credentials.txt` file in the previous step.
- Make sure to scroll down and click "Save Changes" at the bottom of the dialog to save your changes.

![auth0 connections social](./images/auth0-connections-social.png)

## Step 7: Setting up Custom Claims in Auth0

**Introduction**

JWT User Access Tokens are base-64 encoded JSON objects: within these json objects there are some keys and fields that are expected to be there. 

If you want to add additional keys and values, these are called _custom claims_.  We can provide Auth0 with some JavaScript code that will insert custom values into the JWT token provided to our application for authentication.

The keys for custom claims must begin with a unique value. This makes sure that claims from one application don't interfere with claims from another application.  For our key, we are using the name of our Heroku app; this is the "audience" value for our custom claim.


The specific "custom claims" we need for our application are
* email
* first name (given name)
* last name (family name)

These are values we can get from the authentication provider (i.e. from Google, via Auth0), and then access in our application.

If your application is mostly working properly, but does not load a user's _role_ properly,  this is often a symptom that the following step was not done properly.

**Instructions**

In Auth0.com go to the left hand sidebar and click `Rules`, then click `Create Rule`. Select `Empty Rule` at the top.

There is a function that takes a user, a context, and a callback. Context has an access token as a property. User has all of the user information. We want to add a property to `context.accessToken`.

To do this, add the following code, _being sure to change_ where it says `""https://ucsb-polls-id.herokuapp.com""`, replacing that with your value for the name
of your heroku app (the value of `heroku.url` in your `temp-credentials.txt` file).   If this does not match the values that you fill in later
for `REACT_APP_AUTH0_AUDIENCE` (which we should also be the value of `heroku.app` in your `temp-credentials.txt` file) then things will not work properly.

Insert this code into the template for the custom claim, replacing the
line that says: `// TODO: implement your rule`

```javascript
context.accessToken["https://ucsb-polls-id.herokuapp.com"]={
  "email" : user.email,
  "given_name" : user.given_name,
  "family_name" : user.family_name
};
```

The whole thing should look something like this when you are done:

```javascript
function (user, context, callback) {
   context.accessToken["https://ucsb-polls-id.herokuapp.com"]={
    "email" : user.email,
    "given_name" : user.given_name,
    "family_name" : user.family_name
  };
  return callback(null, user, context);
}
```


## Step 8: Add Custom Action
We will have to add an additional custom action for new users to be added to our database automatically. On the left hand bar click on "Actions" and then "Custom Action"
On the new page, click on "Create". Give your action any name (e.g. "add to db") and select "Login/Post Login" as the trigger. Then, on the new page, add the following snippet of code.


```javascript

const axios = require("axios");
exports.onExecutePostLogin = async (event, api) => {
    //await axios.post("/addNewUser", { params: { name: "test", email: "test@gmail.com" }});
    axios.post('https://ucsb-polls-id.herokuapp.com/addNewUser', {
        name: event.user.name,
        email: event.user.email,
    });
};
```

Click on deploy.

Finally, go to "flows" under action.

Click on "Login". Drag your newly created action and add it to the flow. Then click on apply. Your changes are now live!















