/**
 * Retrieves a value from the kc2 object using the provided key.
 *
 * @param {string} key - The key used to access the corresponding value in kc2.
 * @returns {string} The value associated with the given key in kc2, or undefined if the key does not exist.
 */
function getValueFromKc2ByKey(key) {
  // Access the kc2 object using the provided key
  return kc2[key];
}

module.exports = getValueFromKc2ByKey;