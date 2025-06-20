/**
 * Calculates the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 *
 * @param {number} firstNumber - The first integer value.
 * @param {number} secondNumber - The second integer value.
 * @returns {number} The greatest common divisor of the two input numbers.
 */
function calculateGreatestCommonDivisor(firstNumber, secondNumber) {
  // If the first number is zero, the GCD is the second number
  if (firstNumber === 0) return secondNumber;

  // Use the Euclidean algorithm to find the GCD
  while (secondNumber !== 0) {
    const temp = secondNumber; // Temporarily store the current second number
    secondNumber = firstNumber % secondNumber; // Update secondNumber to the remainder
    firstNumber = temp; // Assign previous secondNumber to firstNumber
  }

  return firstNumber;
}

module.exports = calculateGreatestCommonDivisor;