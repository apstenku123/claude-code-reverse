/**
 * Calculates a weighted difference based on two numeric values extracted from the input parameter.
 *
 * This function calls the external `getBase64PaddingInfo` function with the provided input, expecting isBlobOrFileLikeObject to return an array of two numbers.
 * It then applies the formula: ((firstValue + secondValue) * 3 / 4) - secondValue.
 *
 * @param {any} inputValue - The input value to be processed by getBase64PaddingInfo.
 * @returns {number} The calculated weighted difference based on the extracted values.
 */
function calculateWeightedDifference(inputValue) {
  // Extract two numeric values from the input using getBase64PaddingInfo
  const [firstValue, secondValue] = getBase64PaddingInfo(inputValue);

  // Apply the weighted difference formula
  // Formula: ((firstValue + secondValue) * 3 / 4) - secondValue
  const weightedDifference = ((firstValue + secondValue) * 3 / 4) - secondValue;

  return weightedDifference;
}

module.exports = calculateWeightedDifference;