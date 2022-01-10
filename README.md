# Authentication

## What is Authentication ?

Authentication is the process of identifying users that request access to a system, network, or device. Access control often determines user identity according to credentials like username and password. Other authentication technologies like biometrics and authentication apps are also used to authenticate user identity.

## Authentication Implementations

### Session based Authentication

Session based authentication is one in which the user state is stored on the server’s memory. When using a session based auth system, the server creates and stores the session data in the server memory when the user logs in and then stores the session Id in a cookie on the user browser.
The session Id is then sent on subsequent requests to the server and the server compares it with the stored session data and proceeds to process the requested action

![session_diagram](/img/session_diagram.png)

### Token Based Authentication

Token based authentication is one in which the user state is stored on the client. This has grown to be the preferred mode of authentication for RESTful APIs. In the token based authentication, the user data is encrypted into a JWT (JSON Web Token) with a secret and then sent back to the client.
The JWT is then stored on the client side mostly localStorage and sent as a header for every subsequent request. The server receives and validates the JWT before proceeding to send a response to the client.

![token_diagram](img/token_diagram.png)

