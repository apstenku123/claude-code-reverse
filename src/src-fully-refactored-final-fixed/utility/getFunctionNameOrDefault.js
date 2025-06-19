/**
 * Returns the name of a given function, or a default value if the input is not a function or an error occurs.
 *
 * @param {Function} inputFunction - The function whose name is to be retrieved.
 * @returns {string} The name of the function, or the default value OE1 if input is invalid or an error occurs.
 */
function getFunctionNameOrDefault(inputFunction) {
  try {
    // Check if inputFunction is provided and is of type 'function'
    if (!inputFunction || typeof inputFunction !== "function") {
      return OE1;
    }
    // Return the function'createInteractionAccessor name property, or OE1 if name is falsy
    return inputFunction.name || OE1;
  } catch (error) {
    // In case of any unexpected error, return OE1
    return OE1;
  }
}

module.exports = getFunctionNameOrDefault;