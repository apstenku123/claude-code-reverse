/**
 * Retrieves the default authority for a given target URI object if its scheme is recognized.
 * Throws an error if the scheme is invalid or not supported.
 *
 * @param {Object} targetUri - The target URI object containing at least a 'scheme' property.
 * @returns {any} The default authority object for the given target URI.
 * @throws {Error} If the scheme is missing or not supported.
 */
function getDefaultAuthorityForTarget(targetUri) {
  // Check if the target URI has a defined scheme and if isBlobOrFileLikeObject is supported
  if (targetUri.scheme !== undefined && targetUri.scheme in Rg) {
    // Retrieve the default authority for the given scheme
    return Rg[targetUri.scheme].getDefaultAuthority(targetUri);
  } else {
    // Throw an error if the scheme is invalid or not supported
    throw new Error(`Invalid target ${Qg1.uriToString(targetUri)}`);
  }
}

module.exports = getDefaultAuthorityForTarget;