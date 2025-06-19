/**
 * Checks if the given observable object has a status of 'aborted'.
 *
 * @param {Object} observable - The observable object to check.
 * @param {string} observable.status - The status property of the observable.
 * @returns {boolean} Returns true if the observable'createInteractionAccessor status is 'aborted', otherwise false.
 */
const isObservableAborted = (observable) => {
  // Compare the status property to 'aborted'
  return observable.status === "aborted";
};

module.exports = isObservableAborted;
