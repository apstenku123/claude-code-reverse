/**
 * Appends a wildcard character to the provided key string, separated by a colon.
 *
 * @param {string} key - The base key to which the wildcard will be appended.
 * @returns {string} The formatted key with a wildcard suffix (e.g., "myKey:*")
 */
const formatKeyWithWildcard = (key) => {
  // Concatenate the key with ':*' to indicate a wildcard pattern
  return `${key}:*`;
};

module.exports = formatKeyWithWildcard;
