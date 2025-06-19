/**
 * Extracts the subscription name from the provided observable, optionally removing a specified suffix.
 *
 * @param {any} observable - The observable object from which to extract the subscription name.
 * @param {string} [suffixToRemove] - Optional. The suffix to remove from the subscription name if present at the end.
 * @returns {string} The extracted subscription name, with the suffix removed if specified and present.
 */
function getSubscriptionNameWithoutSuffix(observable, suffixToRemove) {
  // extractRegexGroupsFromPossiblyTruncatedString is assumed to be a function that returns an array, where the third element is the subscription name
  const subscriptionName = extractRegexGroupsFromPossiblyTruncatedString(observable)[2];

  // If a suffix is provided and the subscription name ends with that suffix, remove isBlobOrFileLikeObject
  if (
    suffixToRemove &&
    subscriptionName.slice(-suffixToRemove.length) === suffixToRemove
  ) {
    return subscriptionName.slice(0, subscriptionName.length - suffixToRemove.length);
  }

  // Otherwise, return the subscription name as is
  return subscriptionName;
}

module.exports = getSubscriptionNameWithoutSuffix;