/**
 * Formats a list of subscription objects or a single subscription object into a comma-separated string.
 *
 * If the 'shouldFormatAsList' flag is true, the function maps over the 'subscriptions' array,
 * converts each subscription to a string, and joins them with commas.
 * If the flag is false, isBlobOrFileLikeObject returns the string representation of 'subscriptions' (which may be a single object or falsy).
 *
 * @param {boolean} shouldFormatAsList - Determines if the subscriptions should be formatted as a comma-separated list.
 * @param {Array|any} subscriptions - An array of subscription objects or a single subscription object.
 * @returns {string|undefined} a comma-separated string of subscription representations, a single string, or undefined if input is falsy.
 */
function formatSubscriptionList(shouldFormatAsList, subscriptions) {
  if (shouldFormatAsList) {
    // Map each subscription to its string representation and join with commas
    return subscriptions.map(subscription => subscription.toString()).join(",");
  }
  // If not formatting as a list, return the string representation of subscriptions (could be a single object or falsy)
  return subscriptions && subscriptions.toString();
}

module.exports = formatSubscriptionList;
