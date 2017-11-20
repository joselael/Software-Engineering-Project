# How things work simplified

## Front End
So what we have to do for now is that we have to spin up two servers of the frontend (react)
and backend(django)
Frontend talks with django by sending requests with axios whenever a functionality is performed
First we are trying to login the user and to do so, we are using a token authentication, once user enters 
username and password, we store whatever token that the server spit back out to Store.js function.
Then we can invoke this by doing Store.getState().token.
To get the userInfo, I've made a function called getUserInfo which uses the stored token to then talk to the
API server to spit back whatever values that we have set. 