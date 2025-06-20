/**
 * Generates a unique identifier string in the format:
 *   v3-<timestamp>-<random13DigitNumber>
 * Example: v3-1718044123456-1234567890123
 *
 * @returns {string} a unique identifier string with a timestamp and random number.
 */
const generateUniqueV3Id = () => {
  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Generate a random 13-digit number between 1000000000000 and 9999999999999
  const minRandomValue = 1000000000000;
  const maxRandomValue = 9999999999999;
  const random13DigitNumber = Math.floor(Math.random() * (maxRandomValue - minRandomValue + 1)) + minRandomValue;

  // Construct the unique identifier string
  const uniqueId = `v3-${timestamp}-${random13DigitNumber}`;

  return uniqueId;
};

module.exports = generateUniqueV3Id;
