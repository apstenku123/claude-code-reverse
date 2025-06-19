/**
 * Sets the 4th bit flag on the 'flags' property of the provided object.
 *
 * This function modifies the 'flags' property of the given object by performing a bitwise OR operation
 * with the value 4. This effectively enables the 4th bit (value 4) in the 'flags' integer, which is commonly
 * used to toggle or enable a specific feature or state represented by that bit.
 *
 * @param {Object} targetObject - The object whose 'flags' property will be modified. Must have a numeric 'flags' property.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the input object in place.
 */
function enableFlagFourOnObject(targetObject) {
  // Enable the 4th bit (value 4) in the 'flags' property using bitwise OR
  targetObject.flags |= 4;
}

module.exports = enableFlagFourOnObject;