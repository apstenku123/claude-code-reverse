/**
 * Generates a random URL-safe string of the specified length.
 *
 * This function asynchronously obtains an array of random numbers (via _T6),
 * then maps each number to a character from the URL-safe base66 alphabet:
 * 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.
 *
 * @param {number} length - The desired length of the generated string.
 * @returns {Promise<string>} a promise that resolves to the generated random string.
 */
async function generateRandomUrlSafeString(length) {
  // URL-safe base66 alphabet
  const urlSafeAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';

  // Obtain an array of random numbers asynchronously
  const randomNumbers = await _T6(length);

  let resultString = '';

  for (let index = 0; index < length; index++) {
    // Map each random number to a character in the alphabet using modulo operation
    const alphabetIndex = randomNumbers[index] % urlSafeAlphabet.length;
    resultString += urlSafeAlphabet[alphabetIndex];
  }

  return resultString;
}

module.exports = generateRandomUrlSafeString;