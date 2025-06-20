/**
 * Determines if the first number is greater than the second number.
 *
 * @param {number} firstNumber - The number to compare as the left operand.
 * @param {number} secondNumber - The number to compare as the right operand.
 * @returns {boolean} True if firstNumber is greater than secondNumber, otherwise false.
 */
function isGreaterThan(firstNumber, secondNumber) {
  // Returns true if firstNumber is strictly greater than secondNumber
  return firstNumber > secondNumber;
}

module.exports = isGreaterThan;