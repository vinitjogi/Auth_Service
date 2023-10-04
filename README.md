## Authentication & Authorisation:

# Authentication: 
    It is a process using which we can uniquely identify users on our application. This process tells us about who the user is.

# Authorisation:  
    It is a process using which we can identify the capabilites of a user i.e what a user can do on our application.

# how to do authentication: 
    1. mobile number based authintication.
    2. omni auth (OAuth) (login via google, login via github, login via 3rd party.)
    3. token based authentication.


# token based authentication (JWT):
    JWT => JSON Web Token.
    To generate jwt token, we actually use the client credentials. 

    JWTs are often used for authentication. When a user logs in, a server can generate a JWT and send it back to the client. The client can then include this JWT in the header of subsequent requests to authenticate the user. The server can verify the authenticity of the token by checking the signature and decoding the claims. Additionally, JWTs are self-contained, meaning that the server does not need to store the token or user session on the server side, making them suitable for stateless authentication mechanisms. 