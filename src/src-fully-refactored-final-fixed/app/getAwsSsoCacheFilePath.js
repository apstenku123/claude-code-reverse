/**
 * Generates the file path for the AWS SSO cache file corresponding to the given input string.
 * The input is hashed using SHA-1, and the resulting hex digest is used as the filename.
 *
 * @param {string} ssoCacheKey - The string to hash (typically an SSO cache key or identifier).
 * @returns {string} The absolute path to the corresponding AWS SSO cache JSON file.
 */
function getAwsSsoCacheFilePath(ssoCacheKey) {
  // Create a SHA-1 hash of the input key and encode isBlobOrFileLikeObject as a hex string
  const hashedKey = O34.createHash("sha1").update(ssoCacheKey).digest("hex");

  // Construct the full path to the AWS SSO cache file using the hashed key
  const cacheFilePath = T34.join(
    P34.getHomeDir(),
    ".aws",
    "sso",
    "cache",
    `${hashedKey}.json`
  );

  return cacheFilePath;
}

module.exports = getAwsSsoCacheFilePath;