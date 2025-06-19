/**
 * Retrieves a value from the getTipsHistory configuration object by key.
 * If the key does not exist, returns 0 as the default value.
 *
 * @param {string} key - The key to look up in the getTipsHistory configuration object.
 * @returns {*} The value associated with the given key in getTipsHistory, or 0 if the key does not exist.
 */
function getValueFromSS2OrDefault(key) {
  // Retrieve the getTipsHistory configuration object
  const ss2Config = getTipsHistory();

  // Return the value for the provided key, or 0 if not found
  return ss2Config[key] || 0;
}

module.exports = getValueFromSS2OrDefault;