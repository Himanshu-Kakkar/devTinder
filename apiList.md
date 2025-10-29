# devConnect APIs

authRouter
 - POST /signup
 - POST /login
 - POST /logout

profileRouter
 - GET /profile/view
 - POST /profile/edit
 - POST /profile/password

Status: interested, ignored, accepted, rejected

connectionRequestRouter
 - POST /request/send/interested/:userId
 - POST /request/send/ignored/:userId

 POST /request/send/:status/:userId
 
 
 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

 POST /request/review/:status/:requestid

userRouter
 - /user/requests/received
 - GET /user/connections
 - GET /user/feed - Gets you the profiles o other users on platform