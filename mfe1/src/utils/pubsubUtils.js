import pubsub from "pubsub-js";

const publishLocks = new Map();
const publishedTopics = new Map();

function publish(topic, message) {
  let publishLock = publishLocks.get(topic);

  if (!publishLock) {
    // Create a new promise and store it in the map
    publishLock = Promise.resolve();
    publishLocks.set(topic, publishLock);
  }

  publishLock = publishLock.then(() => {
    const previousMessage = publishedTopics.get(topic);
    if (previousMessage === message) {
      console.error(
        `Skipping publish for ${topic}: message is the same as previous`
      );
      return;
    }

    publishedTopics.set(topic, message);
    pubsub.publish(topic, message);
  });

  // Update the promise in the map
  publishLocks.set(topic, publishLock);
}

export default { publish };
