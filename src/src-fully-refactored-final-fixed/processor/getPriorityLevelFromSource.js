/**
 * Determines the priority level associated with a given source observable.
 *
 * Iterates through defined priority levels (HIGHEST, MIDDLE, BASIC) and returns the corresponding
 * xz1 constant if the source observable matches the subscription type using doesPatternMatchInKw5Category.
 * If no match is found, returns xz1.NONE.
 *
 * @param {string} sourceObservable - The observable or identifier to check for priority level.
 * @returns {string} The priority level constant from xz1 (HIGHEST, MIDDLE, BASIC, or NONE).
 */
function getPriorityLevelFromSource(sourceObservable) {
  // Define the mapping of priority names to their corresponding xz1 constants
  const priorityLevels = [
    ["HIGHEST", xz1.HIGHEST],
    ["MIDDLE", xz1.MIDDLE],
    ["BASIC", xz1.BASIC]
  ];

  // Iterate through each priority level and check if the source matches
  for (const [subscription, priorityConstant] of priorityLevels) {
    // doesPatternMatchInKw5Category checks if the sourceObservable matches the current subscription type
    if (doesPatternMatchInKw5Category(sourceObservable, subscription)) {
      return priorityConstant;
    }
  }

  // If no priority level matches, return NONE
  return xz1.NONE;
}

module.exports = getPriorityLevelFromSource;