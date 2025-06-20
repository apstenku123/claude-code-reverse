/**
 * Sets the hours, minutes, seconds, and milliseconds of a subscription object to the end of the day (23:59:59.999).
 *
 * @param {any} sourceObservable - The source observable or value to create the subscription from.
 * @param {Object} [config] - Optional configuration object, may contain an 'in' property.
 * @returns {any} The subscription object with its time set to the end of the day.
 */
function setSubscriptionToEndOfDay(sourceObservable, config) {
  // Create a subscription object using MW, passing 'in' property from config if available
  const subscription = MW(sourceObservable, config?.in);
  // Set the time to 23:59:59.999 (end of day)
  subscription.setHours(23, 59, 59, 999);
  return subscription;
}

module.exports = setSubscriptionToEndOfDay;