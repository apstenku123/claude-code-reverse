/**
 * Reads and parses the SSO token JSON file for the given source observable.
 *
 * @param {string} sourceObservable - The identifier or path used to determine the SSO token file location.
 * @returns {Promise<Object>} The parsed SSO token JSON object.
 */
async function getParsedSSOTokenFromFile(sourceObservable) {
  // Get the file path for the SSO token based on the source observable
  const ssoTokenFilePath = j34.getSSOTokenFilepath(sourceObservable);

  // Read the contents of the SSO token file as UTF-8 encoded text
  const ssoTokenFileContents = await k34(ssoTokenFilePath, "utf8");

  // Parse and return the JSON content of the SSO token file
  return JSON.parse(ssoTokenFileContents);
}

module.exports = getParsedSSOTokenFromFile;