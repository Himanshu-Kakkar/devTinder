# S02 E07

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

## secure/hide password in mongodb
#### utils : helper files / helper functions

password hashing 
n level encryption on password

login route
compare/validate user's emailId and Password with db's feilds


# S02 E-10

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