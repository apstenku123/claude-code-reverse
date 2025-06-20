/**
 * Generates a random alphanumeric string of a specified length using a given character set.
 * Utilizes a cryptographically secure random number generator for randomness.
 *
 * @param {number} [length=16] - The desired length of the generated string.
 * @param {string} [characterSet=pJA.ALPHA_DIGIT] - The set of characters to use for string generation.
 * @returns {string} a random string composed of characters from the provided character set.
 */
function generateRandomAlphaNumericString(length = 16, characterSet = pJA.ALPHA_DIGIT) {
  // Initialize the result string
  let randomString = "";

  // Get the length of the character set
  const characterSetLength = characterSet.length;

  // Create a Uint32Array to hold random values
  const randomValues = new Uint32Array(length);

  // Fill the array with cryptographically secure random values
  MV9.randomFillSync(randomValues);

  // Build the random string by mapping random values to characters in the set
  for (let i = 0; i < length; i++) {
    // Use modulo to ensure the index is within the character set
    const randomIndex = randomValues[i] % characterSetLength;
    randomString += characterSet[randomIndex];
  }

  return randomString;
}

module.exports = generateRandomAlphaNumericString;