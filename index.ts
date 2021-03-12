import * as firebase from "firebase-admin";
require("dotenv").config();

async function main() {
  try {
    firebase.initializeApp({
      credential: firebase.credential.applicationDefault(),
      databaseURL:
        process.env?.DATABASE_URL ?? "https://example-project.firebaseio.com",
    });

    const pushNotificationData = {
      token: process.env?.TOKEN ?? "sampletoken",

      // Platform-independent common fields
      notification: {
        title: "title",
        body: "body",
      },

      // Android-specific fields
      android: {
        priority: "high",
        notification: {
          sound: "default",
        },
      },

      // IOS-specific fields
      apns: {
        headers: {
          "apns-priority": "10",
        },
        payload: {
          aps: {
            sound: "default",
          },
        },
      },

      // Assigning the optional custom data payload to the data property
      // https://firebase.google.com/docs/cloud-messaging/concept-options#notification-messages-with-optional-data-payload
      data: {},
    } as firebase.messaging.Message;

    await firebase.messaging().send(pushNotificationData);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
