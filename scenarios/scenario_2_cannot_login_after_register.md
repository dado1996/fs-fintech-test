# Scenario 2: Cannot Access Account After Registration

## User Complaint

A newly registered user complains that immediately after completing the registration form and receiving a success message, they are unable to log in. When they try to log in with the credentials they just created, they receive an "Invalid credentials" or "User not found" error.

## Steps to Reproduce

1.  Navigate to the registration page.
2.  Fill out the registration form with unique and valid details (username, email, password).
3.  Submit the registration form.
4.  Observe a success message indicating registration was successful.
5.  Navigate to the login page.
6.  Enter the exact username/email and password used during registration.
7.  Click the "Login" button.
8.  **Expected Result:** The user is successfully logged in.
9.  **Actual Result:** The user receives an error message (e.g., "Invalid credentials", "User not found", "Authentication failed").

## Technical Investigation Task

The technical team must trace the registration process and subsequent login attempt to identify why the newly created user account is not accessible.

### Potential Areas to Investigate:

1.  **Backend Registration Logic:**
    *   Review the code in `fintech-support-challenge/backend/src/controllers/userController.ts` (specifically the registration handler, likely `registerUser` or similar).
    *   Is the user data actually being saved to the database after validation?
    *   Is the password hashing occurring correctly *before* saving the user? If the plaintext password is saved, login comparison will fail.
    *   Are there any errors occurring silently during the database save operation (e.g., constraint violations, connection issues)? Check backend logs.
    *   Is there an asynchronous operation for saving the user that isn't being awaited properly, potentially causing the success response to be sent before the save is complete?
2.  **Database:**
    *   Connect to the database (PostgreSQL) used by the backend.
    *   Manually check if the user record exists in the `users` table after the supposed successful registration.
    *   Verify if the `password` field in the newly created record contains a properly formatted hash, not the plaintext password.
3.  **Login Logic:**
    *   Re-verify the login handler (`loginUser`) in `userController.ts`. Is it looking up the user correctly (e.g., by email or username)?
    *   Is the comparison field case-sensitive (e.g., searching for `email` but the user typed `Email`)?
4.  **Frontend Data Transmission:**
    *   Use browser developer tools to inspect the network request during login. Is the username/email and password being sent exactly as entered?
5.  **Transaction Issues:**
    *   If the registration process involves multiple database operations, is it wrapped in a transaction? Could the transaction be failing and rolling back the user creation without a clear error message to the frontend?

## Possible Solutions (Hotfix Focus)

*   **Ensure Database Save:** Add explicit error handling and logging around the database save operation (`user.save()` or `UserRepository.create()`) in the registration controller. Ensure it completes successfully before sending a success response.
*   **Await Asynchronous Operations:** Make sure any promises returned by database operations or hashing functions are correctly `await`ed.
*   **Verify Hashing:** Double-check that `bcrypt.hash()` (or equivalent) is called *before* saving the user data and that the resulting hash is stored, not the original password.
*   **Database Connection/Pool:** Check for potential issues with database connections being exhausted or dropped, although this is less likely for a single registration.

## Acceptance Criteria for Fix

*   A user successfully completing the registration process can immediately log in using the credentials they created.
*   The user record exists in the database with a correctly hashed password after registration.
