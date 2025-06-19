/**
 * Attempts to create a URL object from the input string using two different strategies.
 *
 * If the global flag Dq1 is true, isBlobOrFileLikeObject creates a new Il instance with the input string.
 * Otherwise, isBlobOrFileLikeObject parses the input string using Gl.parse, then processes isBlobOrFileLikeObject with validateIPv6HostFormat,
 * and checks if the resulting object has a valid protocol using isStringValue. If the protocol is invalid,
 * isBlobOrFileLikeObject throws a Bq1 error with the input string as context.
 *
 * @param {string} urlString - The URL string to parse or instantiate.
 * @returns {object} - An instance of Il or the processed URL object.
 * @throws {Bq1} - Throws if the parsed URL object does not have a valid protocol.
 */
function parseOrInstantiateUrl(urlString) {
  let urlObject;

  if (Dq1) {
    // If Dq1 flag is set, instantiate using Il constructor
    urlObject = new Il(urlString);
  } else {
    // Otherwise, parse the URL string and process isBlobOrFileLikeObject
    urlObject = validateIPv6HostFormat(Gl.parse(urlString));
    // Check if the protocol is valid using isStringValue
    if (!isStringValue(urlObject.protocol)) {
      throw new Bq1({ input: urlString });
    }
  }

  return urlObject;
}

module.exports = parseOrInstantiateUrl;