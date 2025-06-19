/**
 * Reads and parses the SSO token from the file associated with the given user identifier.
 *
 * @param {string} userId - The identifier used to determine the SSO token file path.
 * @returns {Promise<Object>} The parsed SSO token object.
 */
async function readSSOTokenFromFile(userId) {
  // Get the file path for the SSO token based on the userId
  const ssoTokenFilePath = j34.getSSOTokenFilepath(userId);

  // Read the file contents as a UTF-8 encoded string
  const ssoTokenFileContents = await k34(ssoTokenFilePath, "utf8");

  // Parse and return the JSON content of the SSO token file
  return JSON.parse(ssoTokenFileContents);
}

module.exports = readSSOTokenFromFile;
