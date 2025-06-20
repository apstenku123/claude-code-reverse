/**
 * Checks if the provided config string matches an invalid pattern and returns an empty string if so; otherwise, returns the original string.
 *
 * @param {any} sourceObservable - (Unused) The source observable or context object. Included for compatibility.
 * @param {string} configString - The configuration string to validate.
 * @returns {string} Returns an empty string if the config string matches the invalid pattern; otherwise, returns the original config string.
 */
function getValidConfigString(sourceObservable, configString) {
  // If the config string matches the invalid pattern, return an empty string
  if (uT6.test(configString)) {
    return "";
  }
  // Otherwise, return the original config string
  return configString;
}

module.exports = getValidConfigString;