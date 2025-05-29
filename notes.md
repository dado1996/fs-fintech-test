# Scenario 1

Problem: User can login with any email and password

Causes:

- The form isn't validating the input or sending any request to the backend
- The backend doesn't have any sort of authentication service
- The table 'users' doesn't have a password field

Fixes:

- Create a password field for the table 'users'
- Implement an auth service that allows the user to login
- Create a fetch function in the frontend to send the credentials to the auth endpoint of the backend

Message:
Dear customer.
Thank you for warning us about this security issue. We are very sorry for the inconveniences that you are experiencing with our platform. We are working with a solution that solves any issues regarding the security of your account

# Scenario 2

Problem: User can't login after registering

Causes:

- There is no register service in the backend
- The register form is not calling any backend endpoint

Fixes:

- Implement the backend service to register a new user
- Create a function to fetch the register endpoint

Message:
Dear customer.
We apologize for your experience with our platform. In this moment we are working on fixing any inconveniences that you could have suffered during the failure
