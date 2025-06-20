/**
 * Retrieves and parses the SSO token JSON file associated with the given source.
 *
 * @async
 * @function getParsedSSOTokenFromSource
 * @param {string} sourceIdentifier - Identifier used to locate the SSO token file (e.g., a username or profile name).
 * @returns {Promise<Object>} Resolves to the parsed JSON object from the SSO token file.
 *
 * @throws {Error} If reading the file fails or the file contents are not valid JSON.
 */
async function getParsedSSOTokenFromSource(sourceIdentifier) {
  // Get the file path for the SSO token based on the provided source identifier
  const ssoTokenFilePath = j34.getSSOTokenFilepath(sourceIdentifier);

  // Read the contents of the SSO token file as a UTF-8 encoded string
  const ssoTokenFileContents = await k34(ssoTokenFilePath, "utf8");

  // Parse and return the JSON content of the SSO token file
  return JSON.parse(ssoTokenFileContents);
}

module.exports = getParsedSSOTokenFromSource;
