/**
 * Determines the highest applicable level for the given input by checking against predefined levels.
 *
 * Iterates through the levels in order of priority (HIGHEST, MIDDLE, BASIC) and returns the first matching level'createInteractionAccessor value from xz1.
 * If none match, returns xz1.NONE.
 *
 * @param {string} input - The value to check against the available levels.
 * @returns {string} The value from xz1 corresponding to the highest matching level, or xz1.NONE if no match is found.
 */
function getHighestLevelForInput(input) {
  // Define the levels in order of priority, mapping their names to xz1 values
  const levelPriorityList = [
    ["HIGHEST", xz1.HIGHEST],
    ["MIDDLE", xz1.MIDDLE],
    ["BASIC", xz1.BASIC]
  ];

  // Iterate through each level and return the value for the first match
  for (const [levelName, levelValue] of levelPriorityList) {
    // doesPatternMatchInKw5Category checks if the input matches the current level
    if (doesPatternMatchInKw5Category(input, levelName)) {
      return levelValue;
    }
  }

  // If no level matches, return the NONE value
  return xz1.NONE;
}

module.exports = getHighestLevelForInput;