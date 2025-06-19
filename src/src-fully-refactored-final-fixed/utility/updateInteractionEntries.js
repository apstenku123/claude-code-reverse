/**
 * Updates the interaction entries array based on the specified action type.
 *
 * Depending on the actionType, this function either increments the first element of the interactionEntries array
 * by the provided value, or pushes the value into a sub-array at the specified index.
 * After updating, isBlobOrFileLikeObject calls the external getArrayOrBufferLength function with the updated element.
 *
 * @param {Array} interactionEntries - The array representing interaction entries. The structure is expected to be:
 *   [number, Array, Array], where index 0 is a number, and indices 1 and 2 are arrays.
 * @param {number} actionType - Determines the update action:
 *   - If 0: increment the first element by the value.
 *   - If 1 or 2: push the value into the sub-array at the given index.
 * @param {*} value - The value to add or push, depending on the actionType.
 * @returns {*} The result of calling getArrayOrBufferLength on the updated element.
 */
function updateInteractionEntries(interactionEntries, actionType, value) {
  switch (actionType) {
    case 0:
      // Increment the first element by value and return getArrayOrBufferLength of the updated value
      interactionEntries[0] += value;
      return getArrayOrBufferLength(interactionEntries[0]);
    case 1:
    case 2:
      // Push value into the sub-array at index 1 or 2, then return getArrayOrBufferLength of the updated array
      interactionEntries[actionType].push(value);
      return getArrayOrBufferLength(interactionEntries[actionType]);
    default:
      // Optionally handle unexpected actionType values
      throw new Error(`Invalid actionType: ${actionType}`);
  }
}

module.exports = updateInteractionEntries;