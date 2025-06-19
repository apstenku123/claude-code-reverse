/**
 * Determines if the class handle created from the provided class name and options is valid.
 *
 * @param {string} className - The name of the class to create a handle for. Defaults to an empty string if not provided.
 * @param {string} options - Additional options or metadata for handle creation. Defaults to an empty string if not provided.
 * @returns {boolean} True if the handle is valid (i.e., createClassHandle returns 1), otherwise false.
 */
function isClassHandleValid(className = "", options = "") {
  // Call createClassHandle with the provided arguments and check if the result is 1 (valid handle)
  return createClassHandle(className, options) === 1;
}

module.exports = isClassHandleValid;