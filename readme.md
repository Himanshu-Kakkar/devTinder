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
