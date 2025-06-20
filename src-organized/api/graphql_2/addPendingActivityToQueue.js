/**
 * Adds a new pending activity object to the provided activity queue.
 *
 * The function creates a new activity object by merging default activity state,
 * provided configuration, and subscription/callback information. It then pushes
 * this object to the given activity queue and returns the newly created activity.
 *
 * @param {Array<Object>} activityQueue - The array representing the activity queue to which the new activity will be added.
 * @param {Object} config - Configuration object containing activity-specific properties to override defaults.
 * @param {Object|Function} subscriptionOrCallback - Either a callback function or an object containing subscription/callback data.
 * @returns {Object} The newly created activity object that was added to the queue.
 */
function addPendingActivityToQueue(activityQueue, config, subscriptionOrCallback) {
  // Default activity state
  const defaultActivityState = {
    timesInvoked: 0,
    times: 1,
    persist: false,
    consumed: false
  };

  // Determine the data to attach: if a function, treat as callback; else, spread the object
  const subscriptionData = typeof subscriptionOrCallback === "function"
    ? { callback: subscriptionOrCallback }
    : { ...subscriptionOrCallback };

  // Compose the new activity object
  const newActivity = {
    ...defaultActivityState,
    ...config,
    pending: true,
    data: {
      error: null,
      ...subscriptionData
    }
  };

  // Add the new activity to the queue
  activityQueue.push(newActivity);

  return newActivity;
}

module.exports = addPendingActivityToQueue;