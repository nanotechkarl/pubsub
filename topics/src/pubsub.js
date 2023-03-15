// pubsub.js

export default class Pubsub {
  constructor(storeName) {
    this.subscribers = {};
    this.middleware = this.middleware.bind(this);
    this.storeName = storeName;
  }

  publish(topic, data) {
    // Store data in session storage
    sessionStorage.setItem(topic, JSON.stringify(data));

    // Notify all subscribers
    if (this.subscribers[topic]) {
      this.subscribers[topic].forEach((callback) => callback(data));
    }
  }

  subscribe(topic, callback) {
    // Register the subscriber
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
    this.subscribers[topic].push(callback);

    // Retrieve data from session storage
    const data = this.getState(topic);

    // Call the callback with the retrieved data
    callback(data);
  }

  unsubscribe(topic, callback) {
    if (this.subscribers[topic]) {
      const index = this.subscribers[topic].indexOf(callback);
      if (index !== -1) {
        this.subscribers[topic].splice(index, 1);
      }
    }
  }

  getState(topic) {
    let data = null;
    //! Coupled getItem with subscribe
    if (this.subscribers[topic]) {
      const storedData = sessionStorage.getItem(topic);
      // console.log("storedData :", storedData);
      data = storedData ? JSON.parse(storedData) : null;
    } else {
      console.error(`Topic '${topic}' not defined in subscribers`);
    }
    return data;
  }

  publishAction(topic, data) {
    return {
      type: "pubsub/publish",
      payload: { topic, data },
    };
  }

  subscribeAction(topic) {
    return {
      type: "pubsub/subscribe",
      payload: { topic },
    };
  }

  unsubscribeAction(topic) {
    return {
      type: "pubsub/unsubscribe",
      payload: { topic },
    };
  }

  middleware({ dispatch }) {
    return (next) => (action) => {
      if (action.type === "pubsub/publish") {
        const { topic, data } = action.payload;
        dispatch({
          type: `pb/pub/${this.storeName}/${topic}`,
          payload: { topic, data },
        });
        this.publish(topic, data);
      } else if (action.type === "pubsub/subscribe") {
        const { topic } = action.payload;
        dispatch({
          type: `pb/sub/${this.storeName}/${topic}`,
          payload: { topic },
        });
        const pubsubCallback = (data) => {
          dispatch({
            type: `pb/sub/${this.storeName}/${topic}`,
            payload: { topic, data },
          });
        };
        if (!this.subscribers[topic]) {
          this.subscribers[topic] = [];
          this.subscribers[topic].push(pubsubCallback); // add the callback to subscribers
        }
      } else if (action.type === "pubsub/unsubscribe") {
        const { topic } = action.payload;
        dispatch({
          type: `pb/unsub/${this.storeName}/${topic}`,
          payload: { topic },
        });
        this.unsubscribe(topic, ""); // remove the subscriber
      } else {
        return next(action);
      }
    };
  }
}

export const pubsub = new Pubsub("1");
