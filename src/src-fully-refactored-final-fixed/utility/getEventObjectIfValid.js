/**
 * Returns a processed event object if the input has a valid constructor and passes the RT check.
 * Otherwise, returns an empty object.
 *
 * @param {Object} inputObject - The object to be checked and processed.
 * @returns {Object} The processed event object or an empty object if conditions are not met.
 */
function getEventObjectIfValid(inputObject) {
  // Check if the input has a constructor function and does not pass the RT check
  const hasConstructorFunction = typeof inputObject.constructor === "function";
  const isNotRT = !RT(inputObject);

  if (hasConstructorFunction && isNotRT) {
    // Process the object through $createDebouncedFunction and fW if valid
    const eventData = $createDebouncedFunction(inputObject);
    return fW(eventData);
  }

  // Return empty object if conditions are not met
  return {};
}

module.exports = getEventObjectIfValid;