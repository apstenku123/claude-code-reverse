/**
 * Sets the global variable 'extractSubstringBetweenSequences' to the provided value.
 *
 * @param {*} newLHValue - The value to assign to the global variable 'extractSubstringBetweenSequences'.
 * @returns {void} This function does not return a value.
 */
function setGlobalLHValue(newLHValue) {
  // Assign the provided value to the global variable 'extractSubstringBetweenSequences'
  extractSubstringBetweenSequences = newLHValue;
}

module.exports = setGlobalLHValue;