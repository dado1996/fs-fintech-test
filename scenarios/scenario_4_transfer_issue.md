# Scenario 4: Balance Resets After Transfer, Recipient Unaffected

## User Complaint

A user (Sender) reports attempting to transfer funds to another user (Recipient). Immediately after the transfer, the Sender's balance decreases correctly on the screen. However, if the Sender reloads the page, their balance reverts to the pre-transfer amount. Furthermore, the intended Recipient confirms they never received the funds, and their balance remains unchanged.

## Steps to Reproduce

1.  Log in as the Sender user.
2.  Note the Sender's current balance.
3.  Identify a valid Recipient user and note their current balance (if possible, or assume a starting point).
4.  Initiate a transfer from Sender to Recipient for a specific amount.
5.  Observe the Sender's balance decrease on the UI post-transfer.
6.  Sender reloads the page (F5) or logs out and logs back in.
7.  Observe the Sender's balance again.
8.  Log in as the Recipient user (or check via admin tools).
9.  Observe the Recipient's balance.
10. **Expected Result:** Sender's balance is permanently decreased. Recipient's balance is permanently increased by the transfer amount. A transaction record exists.
11. **Actual Result:** Sender's balance reverts to the pre-transfer amount upon reload. Recipient's balance never increases. A transaction record might or might not exist, or might be incomplete.

## Technical Investigation Task

The technical team must investigate the entire transfer process, focusing on why both the debit from the sender and the credit to the recipient are failing to persist or execute correctly.

### Potential Areas to Investigate:

1.  **Backend Transfer Logic:**
    *   Examine the controller/service responsible for handling transfers.
    *   Trace the steps: Does it fetch both Sender and Recipient accounts? Does it check Sender's sufficient funds? Does it *attempt* to decrease Sender balance? Does it *attempt* to increase Recipient balance? Does it record the transaction?
2.  **Database Transactions (Atomicity):**
    *   **CRITICAL:** Is the entire transfer operation (debit sender, credit recipient, record transaction) wrapped in a single database transaction? This is essential for atomicity – either all parts succeed, or all parts fail (rollback).
    *   If a transaction is used, is there an error occurring *within* the transaction block (e.g., trying to update the recipient fails after updating the sender) causing a rollback?
    *   If no transaction is used, this is likely the root cause. The system might successfully update the sender temporarily, then fail to update the recipient, leaving the database in an inconsistent state that isn't reflected correctly on reload.
3.  **Database Persistence:**
    *   Are the changes to *both* the Sender's and Recipient's balances being explicitly saved/committed to the database within the transaction?
    *   Check the database directly after a failed transfer attempt. Are either the sender's or recipient's balances changed permanently?
4.  **Error Handling:**
    *   Is there adequate error handling within the transfer logic? If the recipient update fails, is the sender's decrement correctly rolled back (if using transactions)? Is an appropriate error returned to the user?
5.  **Data Fetching Logic (Post-Action & Reload):**
    *   Similar to Scenario 3, verify that balances are fetched correctly from the database on page reload, not relying on potentially inconsistent frontend state.

## Explanation for the User

*   "We've found an issue in our transfer processing where the updates to both your balance and the recipient's balance were not being completed and saved correctly in all cases. This caused your balance to appear unchanged after reloading and prevented the funds from reaching the recipient. We are implementing a fix to ensure transfers are processed reliably and atomically."*

## Possible Solutions

*   **Implement Atomic Database Transactions:** Wrap the entire transfer operation (sender debit, recipient credit, transaction logging) within a single database transaction. This is the most crucial fix.
*   **Robust Error Handling:** Inside the transaction, ensure any failure (e.g., recipient not found, database error) triggers a rollback and returns a clear error message.
*   **Verify Save/Commit:** Ensure that changes to both user models/accounts are explicitly saved *before* the transaction is committed.
*   **Correct Data Fetching:** Ensure balances are always fetched from the authoritative database source on page load/reload.

## Acceptance Criteria for Fix

*   After a successful transfer, the Sender's balance is permanently decreased upon reload/re-login.
*   After a successful transfer, the Recipient's balance is permanently increased upon reload/re-login.
*   If a transfer fails mid-process (e.g., recipient invalid, insufficient funds), the Sender's balance remains unchanged (or is rolled back), and the Recipient's balance remains unchanged.
*   A clear transaction record exists for every successful transfer.
