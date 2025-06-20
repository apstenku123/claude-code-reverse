/**
 * Extracts a configuration object from the given source object, focusing on the 'Host' header.
 * If the 'Host' header exists, its value is set to the first element of its array.
 *
 * @param {Object} sourceObject - The source object containing header information.
 * @returns {Object} a shallow copy of the header configuration with a normalized 'Host' header if present.
 */
function extractHostHeaderConfig(sourceObject) {
  // Create a shallow copy of the header configuration from sourceObject[_Q]
  const headerConfig = Object.assign({
    __proto__: null
  }, sourceObject[_Q]);

  // Retrieve the key for the 'Host' header using findKeyCaseInsensitive
  const hostHeaderKey = findKeyCaseInsensitive(sourceObject[_Q], "Host");

  // If the 'Host' header exists, set its value to the first element of its array
  if (hostHeaderKey !== undefined) {
    headerConfig[hostHeaderKey] = headerConfig[hostHeaderKey][0];
  }

  return headerConfig;
}

module.exports = extractHostHeaderConfig;