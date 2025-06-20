/**
 * Checks if the given URL-like object uses a special protocol (about:, blob:, or data:).
 *
 * @param {Object} urlObject - An object expected to have a 'protocol' property (e.g., a URL instance).
 * @returns {boolean} True if the protocol is 'about:', 'blob:', or 'data:'.
 */
function isSpecialProtocolUrl(urlObject) {
  // Ensure the object has a 'protocol' property; throws if not
  v_("protocol" in urlObject);

  const protocol = urlObject.protocol;
  // Return true if the protocol is one of the special types
  return protocol === "about:" || protocol === "blob:" || protocol === "data:";
}

module.exports = isSpecialProtocolUrl;