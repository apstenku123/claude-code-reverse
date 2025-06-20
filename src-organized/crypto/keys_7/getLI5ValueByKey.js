/**
 * Retrieves a value from the lI5 object using the provided key.
 *
 * @param {string} key - The key used to access the value in the lI5 object.
 * @returns {*} The value associated with the specified key in lI5, or undefined if the key does not exist.
 */
const getLI5ValueByKey = (key) => {
  // Access and return the value from lI5 using the provided key
  return lI5[key];
};

module.exports = getLI5ValueByKey;