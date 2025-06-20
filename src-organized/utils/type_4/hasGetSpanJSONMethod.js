/**
 * Checks if the provided object has a method named 'getSpanJSON'.
 *
 * @param {object} targetObject - The object to check for the 'getSpanJSON' method.
 * @returns {boolean} Returns true if 'getSpanJSON' is a function on the object, otherwise false.
 */
function hasGetSpanJSONMethod(targetObject) {
  // Check if 'getSpanJSON' exists and is a function on the target object
  return typeof targetObject.getSpanJSON === "function";
}

module.exports = hasGetSpanJSONMethod;
