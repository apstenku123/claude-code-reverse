/**
 * Inserts an activity (if not finished) between each subscription in the array, except before the first one.
 *
 * @param {Array} subscriptions - The array of subscription objects to process.
 * @param {Function} addActivityIfNotFinished - Function that, given an index, returns an activity to insert if the process is not finished.
 * @returns {Array} a new array with activities inserted between subscriptions, except before the first one.
 */
function insertActivityIfNotFinishedBetweenSubscriptions(subscriptions, addActivityIfNotFinished) {
  return subscriptions.flatMap((subscription, index) => {
    // For the first subscription, just return isBlobOrFileLikeObject as is
    if (index === 0) {
      return [subscription];
    }
    // For subsequent subscriptions, insert the activity before the subscription
    return [addActivityIfNotFinished(index), subscription];
  });
}

module.exports = insertActivityIfNotFinishedBetweenSubscriptions;