// pubsub.js

export default class Pubsub {
  constructor() {
    this.subscribers = {};
    this.middleware = this.middleware.bind(this);
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

  publishAction(topic, data, dispatch) {
    const action = {
      type: "pubsub/publish",
      payload: { topic, data },
    };
    dispatch(action);
    this.publish(topic, data);
    return action;
  }

  subscribeAction(topic, callback, dispatch) {
    const action = {
      type: "pubsub/subscribe",
      payload: { topic },
    };
    dispatch(action);
    this.subscribe(topic, callback);
    return action;
  }

  unsubscribeAction(topic, callback, dispatch) {
    const action = {
      type: "pubsub/unsubscribe",
      payload: { topic },
    };
    dispatch(action);
    this.unsubscribe(topic, callback);
    return action;
  }

  middleware({ dispatch }) {
    return (next) => (action) => {
      console.log("action :", action);
      if (action.type === "pubsub/publish") {
        const { topic, data } = action.payload;
        dispatch({
          type: `pb/pub/${topic}`,
          payload: { topic, data },
        });
        // this.publish(topic, data);
      } else if (action.type === "pubsub/subscribe") {
        const { topic } = action.payload;
        dispatch({
          type: `pb/sub/${topic}`,
          payload: { topic },
        });
      } else if (action.type === "pubsub/unsubscribe") {
        const { topic } = action.payload;
        dispatch({
          type: `pb/unsub/${topic}`,
          payload: { topic },
        });
      } else {
        return next(action);
      }
    };
  }
}

export const pubsub = new Pubsub();
