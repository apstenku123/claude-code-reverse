/**
 * Adds the provided observable to the front of the global observable queue.
 * This ensures the observable is processed before others in the queue.
 *
 * @param {any} observable - The observable to add to the queue.
 * @returns {void} This function does not return a value.
 */
const addObservableToQueue = (observable) => {
  // Add the observable to the front of the queue for prioritized processing
  qCA.unshift(observable);
};

module.exports = addObservableToQueue;
