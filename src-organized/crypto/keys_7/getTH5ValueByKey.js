/**
 * Retrieves a value from the tH5 object using the provided key.
 *
 * @param {string} key - The key used to access the tH5 object.
 * @param {object} config - Configuration object (unused in this function).
 * @param {object} subscription - Subscription object (unused in this function).
 * @param {object} interactionInfo - Additional interaction information (unused in this function).
 * @returns {*} The value from tH5 corresponding to the provided key.
 */
const getTH5ValueByKey = (key, config, subscription, interactionInfo) => {
  // Access and return the value from tH5 using the provided key
  return tH5[key];
};

module.exports = getTH5ValueByKey;
