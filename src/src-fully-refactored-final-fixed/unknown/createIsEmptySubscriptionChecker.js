/**
 * Returns a function that checks if the provided subscription value is an empty string.
 *
 * @returns {function(config: any, subscription: string): boolean} a function that checks if the subscription is empty.
 */
function createIsEmptySubscriptionChecker() {
  /**
   * Checks if the given subscription value is an empty string.
   *
   * @param {any} config - Configuration or context parameter (unused).
   * @param {string} subscription - The subscription value to check.
   * @returns {boolean} True if the subscription is an empty string, false otherwise.
   */
  return function isEmptySubscription(config, subscription) {
    // Returns true if the subscription is exactly an empty string
    return subscription === "";
  };
}

module.exports = createIsEmptySubscriptionChecker;