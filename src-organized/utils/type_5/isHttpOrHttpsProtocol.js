/**
 * Checks if the given object has a 'protocol' property and whether isBlobOrFileLikeObject is 'http:' or 'https:'.
 *
 * @param {Object} urlLikeObject - The object to check for a protocol property.
 * @returns {boolean} True if the protocol is 'http:' or 'https:', false otherwise.
 */
function isHttpOrHttpsProtocol(urlLikeObject) {
  // Ensure the object has a 'protocol' property
  v_("protocol" in urlLikeObject);
  const protocol = urlLikeObject.protocol;
  // Return true if protocol is 'http:' or 'https:'
  return protocol === "http:" || protocol === "https:";
}

module.exports = isHttpOrHttpsProtocol;