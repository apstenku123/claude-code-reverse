/**
 * Combines two parts of a large integer (stored as an array) into a single BigInt value.
 *
 * This function assumes the input array represents a large integer split into two parts:
 * - The first element is the higher-order part (multiplied by 1e9)
 * - The second element is the lower-order part
 *
 * For example, [123, 456789012] represents 123 * 1e9 + 456789012.
 *
 * @param {number[]} bigIntParts - An array of two numbers: [highPart, lowPart]
 * @returns {BigInt} The combined BigInt value
 */
function combineBigIntPartsToNumber(bigIntParts) {
  // Define the base multiplier (1e9) as a BigInt
  const BASE = BigInt(1e9);

  // Convert both parts to BigInt and combine them
  const highPart = BigInt(bigIntParts[0]);
  const lowPart = BigInt(bigIntParts[1]);

  // Combine the high and low parts into a single BigInt
  return highPart * BASE + lowPart;
}

module.exports = combineBigIntPartsToNumber;