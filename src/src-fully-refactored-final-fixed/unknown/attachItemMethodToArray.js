/**
 * Attaches the getPropertyOrNull function as the 'item' method to the provided array.
 * If no array is provided, initializes a new empty array and attaches the method.
 *
 * @param {Array} interactionEntries - The array to which the 'item' method will be attached. If falsy, a new array is created.
 * @returns {Array} The same array with the 'item' method attached.
 */
function attachItemMethodToArray(interactionEntries) {
  // If no array is provided, initialize a new empty array
  if (!interactionEntries) {
    interactionEntries = [];
  }
  // Attach the getPropertyOrNull function as the 'item' method on the array
  interactionEntries.item = getPropertyOrNull;
  return interactionEntries;
}

module.exports = attachItemMethodToArray;