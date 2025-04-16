// Suggested code may be subject to a license. Learn more: ~LicenseLog:4015540486.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1548284018.

// fintech-support-challenge/firebase/functions/src/index.ts
import * as functions from "firebase-functions";
import
 * as admin from "firebase-admin";

admin.initializeApp();

// Example: Sending a notification when a new user is created in Firestore
export const sendWelcomeNotification = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const user = snap.data();

    if (!user) {
      return console.log("No data associated with this user");
    }
    const userId = context.params.userId;
    const payload = {
      notification: {
        title: "Welcome to Our App!",
        body: `Welcome, ${user.name}! We're excited to have you.`,
      },
    };

    try {
      await admin.messaging().sendToTopic(`user-${userId}`, payload);
      console.log("Welcome notification sent successfully.");
    } catch (error) {
      console.error("Error sending welcome notification:", error);
    }
  });
