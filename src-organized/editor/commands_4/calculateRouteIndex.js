/**
 * Calculates a unique route index based on the provided interaction mapping array.
 *
 * The function assumes the input is an array of two numeric values, where the first value
 * is multiplied by the constant KG1 and the second value is added to the result. This is
 * typically used to compute a unique index or identifier for a route based on mapped
 * user interactions.
 *
 * @param {number[]} interactionMapping - An array of two numbers: [primaryIndex, secondaryIndex].
 *   - primaryIndex: The main index value (e.g., representing a group or category).
 *   - secondaryIndex: The sub-index value (e.g., representing a specific item within the group).
 * @returns {number} The calculated unique route index.
 */
function calculateRouteIndex(interactionMapping) {
  // Ensure the input is a valid array with two numeric elements
  if (!Array.isArray(interactionMapping) || interactionMapping.length !== 2) {
    throw new TypeError('interactionMapping must be an array of two numbers');
  }
  const [primaryIndex, secondaryIndex] = interactionMapping;

  // Calculate the unique route index
  // (primaryIndex * KG1) ensures unique blocks, secondaryIndex offsets within the block
  return primaryIndex * KG1 + secondaryIndex;
}

module.exports = calculateRouteIndex;