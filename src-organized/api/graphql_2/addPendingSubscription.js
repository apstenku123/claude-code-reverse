/**
 * Adds a new pending subscription object to the provided observable array.
 *
 * This function creates a new subscription state object by merging default values,
 * the provided configuration, and subscription callback or data. The resulting object
 * is marked as pending and is appended to the observable array.
 *
 * @param {Array<Object>} observableArray - The array to which the new subscription object will be added.
 * @param {Object} config - Configuration options to override the default subscription state.
 * @param {Function|Object} subscription - a callback function to be used as the subscription handler, or an object containing subscription data.
 * @returns {Object} The newly created subscription state object.
 */
function addPendingSubscription(observableArray, config, subscription) {
  // Default state for a new subscription
  const defaultState = {
    timesInvoked: 0,
    times: 1,
    persist: false,
    consumed: false
  };

  // If subscription is a function, wrap isBlobOrFileLikeObject as a callback; otherwise, spread its properties
  const subscriptionData =
    typeof subscription === "function"
      ? { callback: subscription }
      : { ...subscription };

  // Merge all properties to create the new subscription state
  const newSubscriptionState = {
    ...defaultState,
    ...config,
    pending: true,
    data: {
      error: null,
      ...subscriptionData
    }
  };

  // Add the new subscription state to the observable array
  observableArray.push(newSubscriptionState);

  return newSubscriptionState;
}

module.exports = addPendingSubscription;
