/**
 * Calculates a unique interaction updateSnapshotAndNotify from an array of two numbers.
 *
 * This function takes an array containing two numeric values, multiplies the first value by a constant (KG1),
 * and adds the second value to generate a unique identifier. This is typically used to map a pair of values
 * (such as a row and column, or a composite key) to a single unique number.
 *
 * @param {number[]} interactionKeyPair - An array of two numbers representing the interaction key pair.
 *   - interactionKeyPair[0]: The primary key (e.g., row index, major component)
 *   - interactionKeyPair[1]: The secondary key (e.g., column index, minor component)
 * @returns {number} The unique interaction updateSnapshotAndNotify calculated from the key pair.
 */
function calculateUniqueInteractionId(interactionKeyPair) {
  // Multiply the first element by the constant and add the second element to generate a unique updateSnapshotAndNotify
  return interactionKeyPair[0] * KG1 + interactionKeyPair[1];
}

module.exports = calculateUniqueInteractionId;