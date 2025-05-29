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

# Scenario 3

Problem: The balance of the account resets

Causes:

- The balance is being handled by a client side variable
- There is no transaction logic in the backend
- There is no field in the database to store the balance

Fixes:

- Add an balance field to the 'users' table
- Add a transaction service to the backend
- Add a state management system to the frontend that allows me to store the account information
- Add a fetch services to add balance to the newly created balance field

Message:
Dear customer.
We are working on a solution to fix the issue related to your balance. We will notify you of the change as soon as possible

# Scenario 4

Problem: Transfer to another user doesn't get reflected on the recipient's account. And the value returns to its original state after refreshing the page

Causes:

- The frontend doesn't have a fetch request to a backend transfer service
- The backend doesn't have a trasnfer service implementation

Fixes:

- Implement a feature to handle transfers between recipients
- Create a fetch function to call the backend service for transfers

Message:
Dear customer.
We are really sorry for what you're experiencing regarding transfers between users. We'll work as soon as possible to
