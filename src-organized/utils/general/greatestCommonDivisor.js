/**
 * Calculates the greatest common divisor (GCD) of two integers using the Euclidean algorithm.
 *
 * @param {number} firstNumber - The first integer value.
 * @param {number} secondNumber - The second integer value.
 * @returns {number} The greatest common divisor of the two input numbers.
 */
function greatestCommonDivisor(firstNumber, secondNumber) {
  // If the first number is zero, the GCD is the second number
  if (firstNumber === 0) return secondNumber;

  // Continue looping until the second number becomes zero
  while (secondNumber !== 0) {
    // Store the current value of secondNumber
    const temp = secondNumber;
    // Update secondNumber to the remainder of firstNumber divided by secondNumber
    secondNumber = firstNumber % secondNumber;
    // Update firstNumber to the previous value of secondNumber
    firstNumber = temp;
  }
  // When secondNumber is zero, firstNumber contains the GCD
  return firstNumber;
}

module.exports = greatestCommonDivisor;