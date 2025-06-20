/**
 * Compares the results of the Nc0 function for two inputs and determines if they are equal.
 *
 * @param {any} firstInput - The first value to be passed to Nc0.
 * @param {any} secondInput - The second value to be passed to Nc0.
 * @param {boolean} [useAlternativeMode=false] - Optional flag to modify Nc0'createInteractionAccessor behavior.
 * @returns {boolean} True if Nc0 returns the same result for both inputs; otherwise, false.
 */
function areNc0ResultsEqual(firstInput, secondInput, useAlternativeMode = false) {
  // Obtain the result of Nc0 for the first input
  const firstResult = Nc0(firstInput, useAlternativeMode);
  // Obtain the result of Nc0 for the second input
  const secondResult = Nc0(secondInput, useAlternativeMode);
  // Compare the two results for strict equality
  return firstResult === secondResult;
}

module.exports = areNc0ResultsEqual;