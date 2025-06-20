/**
 * Checks if the subscription is inactive by delegating to rM6.
 *
 * @param {Object} sourceObservable - The observable source to check.
 * @param {Object} config - Configuration object for the check.
 * @param {Object} subscription - The subscription instance to verify.
 * @returns {boolean} Returns true if the subscription is inactive (i.e., rM6 returns 0), otherwise false.
 */
const isSubscriptionInactive = (sourceObservable, config, subscription) => {
  // rM6 returns 0 if the subscription is inactive
  return rM6(sourceObservable, config, subscription) === 0;
};

module.exports = isSubscriptionInactive;