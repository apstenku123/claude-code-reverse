/**
 * Determines the highest subscription level available for a given source.
 *
 * Iterates through the subscription levels in order of priority (HIGHEST, MIDDLE, BASIC),
 * and returns the corresponding value from xz1 if the source matches that level.
 * If none match, returns xz1.NONE.
 *
 * @param {string} sourceObservable - The source to check for subscription level.
 * @returns {string} The matching subscription level value from xz1, or xz1.NONE if no match is found.
 */
function getHighestSubscriptionLevel(sourceObservable) {
  // Define the subscription levels in order of priority
  const subscriptionLevels = [
    ["HIGHEST", xz1.HIGHEST],
    ["MIDDLE", xz1.MIDDLE],
    ["BASIC", xz1.BASIC]
  ];

  // Iterate through each subscription level and check if the source matches
  for (const [subscription, subscriptionValue] of subscriptionLevels) {
    // doesPatternMatchInKw5Category checks if the sourceObservable matches the current subscription level
    if (doesPatternMatchInKw5Category(sourceObservable, subscription)) {
      return subscriptionValue;
    }
  }

  // If no subscription level matches, return xz1.NONE
  return xz1.NONE;
}

module.exports = getHighestSubscriptionLevel;