/**
 * Iterates through the provided array of subscriptions in reverse order,
 * finds the first non-falsy subscription, processes isBlobOrFileLikeObject with getAssistantMessageUsage,
 * and if the result is truthy, returns the result of processing isBlobOrFileLikeObject with calculateTotalTokenCount.
 * If no valid subscription is found, returns 0.
 *
 * @param {Array} subscriptions - An array of subscription objects to process.
 * @returns {*} The result of calculateTotalTokenCount on the first valid processed subscription, or 0 if none found.
 */
function findAndProcessFirstValidSubscription(subscriptions) {
  let currentIndex = subscriptions.length - 1;
  // Iterate through the subscriptions array in reverse
  while (currentIndex >= 0) {
    const subscription = subscriptions[currentIndex];
    // Only process if the subscription is truthy
    const processedSubscription = subscription ? getAssistantMessageUsage(subscription) : undefined;
    // If processedSubscription is truthy, return the result of calculateTotalTokenCount
    if (processedSubscription) {
      return calculateTotalTokenCount(processedSubscription);
    }
    currentIndex--;
  }
  // Return 0 if no valid subscription was found
  return 0;
}

module.exports = findAndProcessFirstValidSubscription;