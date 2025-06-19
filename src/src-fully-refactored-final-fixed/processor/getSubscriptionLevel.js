/**
 * Determines the subscription level for a given source observable.
 *
 * Iterates through the available subscription levels (HIGHEST, MIDDLE, BASIC) and returns
 * the corresponding value from xz1 if the source observable matches that level via doesPatternMatchInKw5Category().
 * If no match is found, returns xz1.NONE.
 *
 * @param {string} sourceObservable - The observable or identifier to check the subscription level for.
 * @returns {string} The matching subscription level value from xz1, or xz1.NONE if no match is found.
 */
function getSubscriptionLevel(sourceObservable) {
  // Define the available subscription levels and their corresponding xz1 values
  const subscriptionLevels = [
    ["HIGHEST", xz1.HIGHEST],
    ["MIDDLE", xz1.MIDDLE],
    ["BASIC", xz1.BASIC]
  ];

  // Iterate through each subscription level
  for (const [subscription, subscriptionValue] of subscriptionLevels) {
    // Check if the sourceObservable matches the current subscription level
    if (doesPatternMatchInKw5Category(sourceObservable, subscription)) {
      return subscriptionValue;
    }
  }

  // Return NONE if no subscription level matches
  return xz1.NONE;
}

module.exports = getSubscriptionLevel;