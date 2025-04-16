# Scenario 3: Balance Resets After Deposit and Reload

## User Complaint

A user reports that after making a deposit into their account and seeing the updated balance, the balance reverts to the previous amount if they reload the page or log out and log back in. The deposit transaction itself might appear in the history, but the main balance display is incorrect.

## Steps to Reproduce

1.  Log in to the user account.
2.  Note the current account balance.
3.  Perform a deposit transaction through the application's interface.
4.  Observe the account balance update on the dashboard/account summary page to reflect the deposit.
5.  Reload the web page (F5 or browser reload button).
6.  Alternatively, log out and log back in.
7.  Observe the account balance again.
8.  **Expected Result:** The account balance should remain the updated amount reflecting the deposit.
9.  **Actual Result:** The account balance reverts to the amount it was *before* the deposit was made.

## Technical Investigation Task

The technical team needs to investigate why the balance update from the deposit appears temporary and is not persisted correctly or not fetched correctly upon reload.

### Potential Areas to Investigate:

1.  **Backend Deposit Logic:**
    *   Review the controller and service handling deposit transactions (likely within the backend, potentially involving `transactionController.ts` or similar if it exists, or `userController.ts` if balance is directly on the user model).
    *   Does the deposit logic correctly update the user's balance in the database?
    *   Is the database update operation being saved/committed?
    *   Is there an error occurring *after* the initial UI update but *before* or *during* the database save?
2.  **Database Persistence:**
    *   Check the database directly. Is the `balance` field (or equivalent) on the `users` table (or a separate `accounts` table) actually being updated after a deposit?
    *   If transactions are stored in a separate table, is the process that updates the main balance from these transactions running correctly?
3.  **Frontend State Management:**
    *   How is the balance displayed on the frontend? Is it fetched fresh from the backend on page load/reload?
    *   Is the frontend potentially caching the balance incorrectly and not re-fetching after the initial deposit update?
    *   Check the component responsible for displaying the balance (e.g., `DashboardContent.tsx`). Where does it get its data? (`useEffect` hook, state management library like Zustand/Redux, etc.).
4.  **Data Fetching Logic (Backend):**
    *   Review the backend endpoint that provides the user's account data (including balance) to the frontend upon login or page load.
    *   Is this endpoint fetching the latest balance from the database?
    *   Could there be caching on the backend API endpoint itself?
5.  **Transaction Atomicity:**
    *   Is the process of recording the deposit transaction and updating the user's balance handled atomically (e.g., within a database transaction)? If the balance update fails, does the transaction record still get created?

## Explanation for the User (Based on Potential Cause)

*   "We've identified an issue where the balance update after a deposit was not being saved permanently to your account record, although the transaction itself was recorded. When you reloaded the page, the system displayed the last permanently saved balance. We are working on a fix to ensure the balance update is saved correctly immediately after a deposit."*

## Possible Solutions

*   **Ensure Database Update & Save:** Verify that the code performing the deposit explicitly updates the balance field and calls the necessary save/commit function on the database model/transaction.
*   **Correct Data Fetching:** Ensure the frontend always fetches the latest balance from the backend API on page load or relevant user actions, rather than relying solely on initial state or frontend cache after actions.
*   **Fix Backend API Endpoint:** Ensure the backend API endpoint responsible for providing user/account data fetches the current balance directly from the database.
*   **Atomic Transactions:** Wrap the deposit transaction recording and balance update in a single database transaction to ensure both succeed or fail together.

## Acceptance Criteria for Fix

*   After a successful deposit, the updated balance persists after a page reload.
*   After a successful deposit, the updated balance persists after logging out and logging back in.
*   The user's balance in the database accurately reflects all successful deposit transactions.
