# S02 E07
API - Feed API - GET/ feed  - get all the users from the db
GET user by ID
Create a Delete USer API
difference betwwen  PATCH and PUT
Upodate a user
Explore the mongoose documentation for Model methods
what are options in a model.findOneAndUpdate method, explore more about it
update the user with email ID

#### self written:
post query is used to send data to mongodb.
to store data to database without changing in code just like actual project using POST

## POSTMAN
POST > body > raw > json
xml was used widely before json

#### difference between JS object and JSON ?
    data is in key-value pair
    In JSON key is also a string
    JS object can take comma after last feild
    while JSON can not
    our server cant read JSON data
    server can read JS object
    
#### Difference between PATCH and PUT
    

# episode 08

Explore schematype options from the documentations
add required, unique, lowercase, min, minLength, trim
Add default
create a custom validate function for gender
Improve the DB schema - put all appropriate validations on each feild
Add timestamps to the user SChema
add API level validations on patch request and sign post API

data Sanitizing ; Add Api Valdations for each feild
Install Validator
Explore Validator library function and use validator() func for passswrod, email, photoUrl, 
Never trust req.body


#### Samjho Ye Case | 
####    Reality

Tumne schema mein likh diya unique: true |
    Bas Mongoose ko bol diya ki database mein index create karna.
Tumne user.save() kiya | 
    Mongoose database mein data bhejega, lekin wo duplicate check MongoDB karega, Mongoose nahi.
Agar DB mein pehle se duplicate hai | 
    Insert fail hoga aur error aayega MongoDB se
Agar DB mein pehle se unique index hi nahi bana | 
    Phir mongoose kuch nahi karega, duplicate data chale jayega silently.

overall improve DB schema

1. checks on db entries
unique, trim, default, required, min, max, minLength, maxLength

2. custom Validators()

3. timestamps: true

#### API level validations
update only certain feilds of DB schema
e.g.  updating email of user can change complete profile of user

## NEVER TRUST REQ.BODY
## NEVER TRUST ON USERS DATA
### ALWAYS VALIDATE EACH FEILD OF USER 

this is called as data sanitization

#### two types of data validation
#### schema level validation
#### API level Validation

use validator library to validate functions



# S02 E-09

validate data in signup API
install bcrypt package
create password hash using bcrypt.hash & save the user is excrupted password
create login API
compare passwords and throw errors if email or password is not valid

## secure/hide password in mongodb
#### utils : helper files / helper functions

password hashing 
n level encryption on password

login route
compare/validate user's emailId and Password with db's feilds


# S02 E-10

install cookie-parser
just send a dummy cookie to user
create /profile API and check if you get the dummy cooiki back
install jsonWebToken
in login API after email and password validation , create a actual jwt token and send it to user in cookies
read the cookies inside your profile API and find the logged In user
create a userAuth middleware
add the userAuth middleware to /profile API and a new /sendConnectionrequest API
set the expiry of JWT token and cookies to 7 days ( or  1 month satndard )
there is a session concept in banking sites
banking sites expires the session in 15-20 mins 

Never expires the token is a big harm.

create userSchema method to getJWT()
cretae userSchema method to comparepassword(passwordInputByUser)
#### JWT Tokens

# We WRITE CODE THAT HUMAN CAN UNDERSTAND

Everytime an API call goes, server need to validate wheather this user is validate or not

WHAT IS LOGIN ?
user logs in with email and password server validate it. and generate a JWT token and wrap inside a cookie send back the cookie to user.
further everytime an API Called by user this cookie sent from user to server and server validate this cookie that user is authenticate or not.
Cookie saved on user's browser.

Cookie can have expire time set by developer.
after expire time. user have old cookie and server has new cookie, validation failed...
so login again.

JWT token : header.payload.signature 


# Session Hijacking
# cookie hijacking
every time you logged in it will create a new token 


# S02 E-11

Create a list of all APIs you can think of in devTinder
Group multiple routes under respective routers

cleaning the app.js

create routes seprately

In app.js app is comming from express()
same as In routes/auth.js authrouter is comming from express.router();
app and router is almost same from user side
developer are the user for use libraries

Create routes folder for managing auth, profiles, request routers
create authRouter, requestrouter, profileRouter inside routes folder
Import these routers in app.js

Create /logout API
Create PATCH /profile/edit
Create Patch /profile/password // forgot passwor API

Make sure you vaidate all data in every post, patch, put APIs.


# S02 E12

#### Logical DB Query

Every single corner of your API should be secure

### Schema.pre()

Create connection request schema
send connection request API
proper validation of data
validate all corner cases
Logical Queries in mongodb $or ,$and, $not, ...

Schema.pre() 
pre is a mongoose middleware hook
"save" is as event handler or action
"save": the hook trigger
run middleware pre function() before save event
cannot use arrow function here bcz of this keyword 
.equals() is strictly compare like === 
used to compare objects

using indexes in schema make it faster in search any query 
db can be hang if finding some data took so long time

unique: true
mongo db automatically create an index
Read more about indexes
why indexes
advantages / disadvantages of indexes
disadvantages of lot of indexes


# S02 E-13

write code with proper validations for POST APIs

thought process for GET vs POST


.save() should be last second line in code
last line response.send()
before save a lot of lines to validate data receiveing from POST APIs

## NEXT WORLD WAR WILL HAPPEN BECAUSE OF DATA
### DATA IS THE NEW OIL

read about ref and .populate()

/user/requests/received done with all checks


# S02 E-14

complete feed API
GET /feed

### Pagination 
 - showing n pages or n user cards on feed instead of loading all Users to the feed API

 - /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)

 - /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

 - /feed?page=3&limit=10 => 21-30 => .skip(10) & .limit(10)

#### req.params -> /feed:params
#### req.query -> /feed?queries

always sent the response in json format or standard format of data
so that frontend can receive it easily


# S02 E-15

#### White Listing Domain names
#### use cors() middleware to allow access between multiple domains


# S03 Ep-02


    - signup on aws
    - Launch instances
    - chmod 400 <secret>.pem
    - cd Downloads
    - ssh -i "DevTinder-secret.pem" ubuntu@ec2-13-60-212-146.eu-north-1.compute.amazonaws.com
    - Install Node version spesific that is used on your project
    - Git clone both frontEnd and Backend 
    - Git pull if any changes is there
    - Backend
        - npm i -> dependencies
        - npm run dev // command to run project at developer level
        - npm start // to run at production level
        - enable frontend ip address in mongo DB Atlas
        // Allowed EC2 instance public IP on mongoDB server
        - Allow port 7777 in aws instance
        - install pm2 // process manager
        - to run npm start 24/7 as we cant run mannually from our terminal for 24/7
        - npm install pm2 -g
        - pm2 start npm -- start // run npm start via pm2
        - pm2 logs // if there is any problem in running 
        - pm2 list // show process status online/stopped

####      // npm is the name of the application 
        - pm2 flush npm // to clear all logs
        - pm2 stop npm // to stop the running server , stop the  process npm
        - pm2 delete npm // to delete the process npm
        - pm2 start npm --name "devTinder-backend" -- start


Backend : http://13.60.212.146:7777/feed
Frontend: http://13.60.212.146/

its like 
backend: devtinder.com:7777/
frontend: devtinder.com/

its a mismatch
### Its a nginx confflict; solution: nginx proxy pass 

there is congiguration file that you will have to edit
its like a proxy match ***http://13.60.212.146:7777/*** to ***http://13.60.212.146/api/***

        - config nginx - /etc/nginx/sites-available/default

code : 
server_name 13.60.212.146;
location /api/ {
        proxy_pass http://13.60.212.146:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    - sudo systemctl restart nginx // restart nginx


# AWS SES 
### Simple Email Service

 - create an IAM user
 - give access to Amazon SES full adress
 - AMAZON SES: create an identity 
    - Either Domain
    - or prsonal mail
- verify domain or mail whatever you have
- Install AWS SDK - v3 
- Code Example: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples

- Setup SES client
- Access Credentials would be created in IAM under security credentials Tab
- add the credentils to the env file
- write code for sesClient
- Write code for sending Email address
- Make the email dynamic by passing more params to the run function


# Sheduling cron jobs in NodeJS

    - Install node-cron
    - Learn about cron expression syntax - crontab.guru
    - Sheduling a job
    - date-fns
    - find all the unique email id who have got connection request in previous day
    - send email
    - explore queue mechanism to send bulk emails
    - Amazon SES Bulk emails
    - Explore Create dynamic template
    - make sendEmail function dynamic
    - BEE-QUEUE and BULL npm packages to handle bulk emails