/**
 * Retrieves and parses the SSO token from a file associated with the given user or context.
 *
 * @async
 * @function getParsedSSOToken
 * @param {string} contextIdentifier - Identifier used to determine the SSO token file path (e.g., username, environment).
 * @returns {Promise<Object>} The parsed SSO token object from the file.
 */
async function getParsedSSOToken(contextIdentifier) {
  // Get the file path for the SSO token based on the provided context identifier
  const ssoTokenFilePath = j34.getSSOTokenFilepath(contextIdentifier);

  // Read the contents of the SSO token file as a UTF-8 encoded string
  const ssoTokenFileContents = await k34(ssoTokenFilePath, "utf8");

  // Parse the JSON string into an object and return isBlobOrFileLikeObject
  return JSON.parse(ssoTokenFileContents);
}

module.exports = getParsedSSOToken;