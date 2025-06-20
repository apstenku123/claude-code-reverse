/**
 * Calculates a weighted difference based on two numeric values extracted from the input using getBase64PaddingInfo.
 *
 * The function expects the input to be processed by getBase64PaddingInfo, which returns an array of two numbers.
 * It then computes: ((firstValue + secondValue) * 3 / 4) - secondValue
 *
 * @param {any} input - The input value to be processed by getBase64PaddingInfo.
 * @returns {number} The calculated weighted difference.
 */
function calculateWeightedDifferenceFromPair(input) {
  // Extract two numeric values from the input using getBase64PaddingInfo
  const [firstValue, secondValue] = getBase64PaddingInfo(input);

  // Compute the weighted difference
  // Formula: ((firstValue + secondValue) * 3 / 4) - secondValue
  const weightedDifference = ((firstValue + secondValue) * 3 / 4) - secondValue;

  return weightedDifference;
}

module.exports = calculateWeightedDifferenceFromPair;