# Scenario 5: Withdrawal Issue - Balance Not Updating & Overdraft Possible

## User Report

A user reports that after successfully performing a withdrawal transaction, their balance appears to decrease correctly on the screen. However, if they reload the page or log out and log back in, their balance reverts to the amount it was *before* the withdrawal. 

Furthermore, the user has discovered that because the balance doesn't seem to permanently update after a withdrawal, they are able to repeatedly perform withdrawals, potentially withdrawing significantly more funds than their actual account balance should allow.

**User Quote:** "I withdrew $50, and it showed my new balance. But when I refreshed the page, my balance was back to the original amount! I tried withdrawing again, and it let me, even though I shouldn't have had enough money left. It seems I can withdraw unlimited money!"

## Initial Analysis (Technical Team)

**Symptoms:**

1.  Balance updates visually on the frontend immediately after withdrawal.
2.  Balance displayed reverts to the pre-withdrawal amount upon page reload or re-login.
3.  The system allows withdrawals that exceed the *actual* (persistent) account balance.

**Potential Causes:**

1.  **Frontend State Issue:** The frontend might be updating the balance locally in its state but failing to fetch the updated balance from the backend after the withdrawal or upon page reload. The initial withdrawal check might use the frontend state, allowing overdraft.
2.  **Backend Transaction Failure:** The withdrawal logic on the backend might not be correctly committing the balance change to the database. It could be failing silently, or the transaction might be rolled back.
3.  **Read/Write Separation:** The backend might be reading the balance from one source (e.g., a cache or a read replica) that isn't updated immediately after the write operation to the primary database completes.
4.  **Lack of Pessimistic Locking/Transaction Integrity:** The withdrawal operation might not properly lock the user's account record during the transaction, potentially leading to race conditions or inconsistent reads.
5.  **Withdrawal Logic Error:** The backend logic might correctly process the *transfer* part of the withdrawal (e.g., sending funds out) but fail to update the user's balance record in the database.
6.  **Incorrect Balance Check:** The check to see if the user has sufficient funds might be flawed, potentially using a stale balance *before* attempting the withdrawal transaction.

## Investigation Steps (Technical Team)

1.  **Reproduce the Issue:** Follow the user's steps precisely in a test environment.
2.  **Check Frontend Network Requests:** Use browser developer tools to inspect the network requests during and after the withdrawal, and upon page reload. Verify if the frontend is requesting updated data and what the backend is returning.
3.  **Review Backend Logs:** Examine backend logs (API gateway, service logs, database logs) for the time of the withdrawal attempts. Look for errors, transaction rollbacks, or warnings related to the withdrawal endpoint and database updates.
4.  **Inspect Database Records:** Directly query the database to check the user's actual balance *before* and *after* the withdrawal attempt and subsequent page reload. Verify if the balance field was ever updated.
5.  **Code Review (Backend):**
    *   Analyze the code handler for the `/withdraw` endpoint.
    *   Verify that the balance check (`SELECT balance FROM accounts WHERE userId = ?`) happens *before* the update.
    *   Ensure the database `UPDATE accounts SET balance = balance - ? WHERE userId = ? AND balance >= ?` operation is correctly implemented within a database transaction.
    *   Confirm the transaction is committed successfully.
    *   Check for proper error handling and transaction rollback logic.
6.  **Code Review (Frontend):**
    *   Examine how the balance is displayed and updated after a withdrawal.
    *   Verify how and when the balance is re-fetched from the backend (e.g., after withdrawal, on page load).

## Hypothesis

The most likely cause is a failure in the backend withdrawal logic to **atomically** check the balance and update it within a single database transaction. The backend might successfully process the external withdrawal but fail to commit the balance change to the local database, or the balance check might be performed using stale data *before* the database update locks the record.

## Solution / Hotfix

**Immediate Hotfix:**

*   Temporarily disable the withdrawal feature until the root cause is fixed, or add stricter server-side validation that re-fetches the balance immediately before processing the withdrawal, potentially locking the record.

**Permanent Solution:**

1.  **Refactor Backend Withdrawal Logic:** Ensure the entire withdrawal process (check balance, deduct amount, potentially interact with external payment gateway, commit changes) is wrapped in a robust database transaction.
2.  **Implement Pessimistic or Optimistic Locking:** Use database locking mechanisms (e.g., `SELECT ... FOR UPDATE`) to prevent race conditions where the balance could be read incorrectly before the update occurs, especially if multiple withdrawal requests arrive concurrently.
3.  **Strengthen Balance Checks:** Ensure the balance check uses the most up-to-date data and is part of the atomic transaction that updates the balance.
4.  **Improve Frontend Data Fetching:** Ensure the frontend reliably re-fetches the user's balance from the backend after a successful withdrawal and on page load/re-login, rather than relying solely on local state.

## Acceptance Criteria (After Fix)

1.  Performing a withdrawal updates the user's balance persistently in the database.
2.  Reloading the page or logging out/in displays the correct, updated balance after a withdrawal.
3.  Attempting to withdraw an amount greater than the *actual* persistent balance results in an error message, and the withdrawal is blocked.
4.  Backend logs confirm successful transaction commits for valid withdrawals and appropriate errors/rollbacks for invalid ones.