/**
 * Checks if the provided object contains a 'duration' property.
 *
 * @param {Object} interactionEntry - The object to check for the 'duration' property.
 * @returns {boolean} Returns true if the object has a 'duration' property, otherwise false.
 */
function hasDurationProperty(interactionEntry) {
  // Use the 'in' operator to check for the existence of the 'duration' property
  return "duration" in interactionEntry;
}

module.exports = hasDurationProperty;