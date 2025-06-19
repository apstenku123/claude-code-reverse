/**
 * Formats a value retrieved from a source (function or object) with a given prefix, handling undefined and object values specially.
 *
 * @param {Function|Object} source - The source from which to retrieve the value. Can be a function (called with key) or an object (accessed by key).
 * @param {string} prefix - The string to prepend to the formatted value.
 * @param {string} key - The key or argument used to retrieve the value from the source.
 * @returns {string} The formatted string with the prefix and the resolved value, or a serialized object if the value is an object.
 */
function formatValueWithPrefix(source, prefix, key) {
  // Retrieve the value either by calling the function or accessing the object property
  let value = typeof source === "function" ? source(key) : source[key];

  // If value is undefined and key is not an empty string, set value to empty string
  if (typeof value === "undefined" && key !== "") {
    value = "";
  } else if (typeof value === "undefined") {
    // If value is still undefined and key is empty, set value to "$"
    value = "$";
  }

  // If the value is an object, serialize isBlobOrFileLikeObject and wrap with aT delimiter
  if (typeof value === "object") {
    return prefix + aT + JSON.stringify(value) + aT;
  }

  // Otherwise, return the prefix concatenated with the value
  return prefix + value;
}

module.exports = formatValueWithPrefix;