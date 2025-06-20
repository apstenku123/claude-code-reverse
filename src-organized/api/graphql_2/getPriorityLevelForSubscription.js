/**
 * Determines the priority level for a given subscription.
 *
 * Iterates through predefined priority levels (HIGHEST, MIDDLE, BASIC) and returns the corresponding
 * value from the xz1 object if the doesPatternMatchInKw5Category function validates the subscription for that level.
 * If none match, returns xz1.NONE.
 *
 * @param {string} subscription - The subscription or observable to check the priority for.
 * @returns {string} The priority level constant from xz1 (HIGHEST, MIDDLE, BASIC, or NONE).
 */
function getPriorityLevelForSubscription(subscription) {
  // Define the priority levels and their corresponding xz1 values
  const priorityLevels = [
    ["HIGHEST", xz1.HIGHEST],
    ["MIDDLE", xz1.MIDDLE],
    ["BASIC", xz1.BASIC]
  ];

  // Iterate through each priority level
  for (const [priorityName, priorityValue] of priorityLevels) {
    // If doesPatternMatchInKw5Category validates the subscription for this priority, return its value
    if (doesPatternMatchInKw5Category(subscription, priorityName)) {
      return priorityValue;
    }
  }

  // If no priority matches, return NONE
  return xz1.NONE;
}

module.exports = getPriorityLevelForSubscription;