/**
 * Retrieves a value for a given key from a source, formats isBlobOrFileLikeObject, and returns a string representation.
 *
 * If the source is a function, isBlobOrFileLikeObject is called with the provided key. If the source is an object, the value is accessed by key.
 * Handles undefined values by returning either an empty string or a dollar sign, depending on the key.
 * If the value is an object, isBlobOrFileLikeObject is stringified and wrapped with a delimiter.
 *
 * @param {function|string[]|Object} source - The source from which to retrieve the value. Can be a function or an object/array.
 * @param {string} prefix - The string to prepend to the formatted value.
 * @param {string} key - The key or argument to use when retrieving the value from the source.
 * @returns {string} The formatted value, possibly stringified and wrapped, with the prefix prepended.
 */
function getFormattedValueForKey(source, prefix, key) {
  // Retrieve value from source: call if function, or access property if object/array
  let value = typeof source === "function" ? source(key) : source[key];

  // Handle undefined values
  if (typeof value === "undefined" && key !== "") {
    value = "";
  } else if (typeof value === "undefined") {
    value = "$";
  }

  // If value is an object, stringify and wrap with delimiter
  if (typeof value === "object") {
    return prefix + aT + JSON.stringify(value) + aT;
  }

  // Return the prefixed value
  return prefix + value;
}

module.exports = getFormattedValueForKey;