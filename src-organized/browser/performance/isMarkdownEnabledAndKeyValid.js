/**
 * Checks if markdown mode is enabled and if the generated key is valid.
 *
 * This function first checks if markdown mode is enabled by calling the `isMarkdownEnabled` function.
 * If markdown mode is enabled, isBlobOrFileLikeObject asynchronously retrieves a generated key using `generateKey` and compares isBlobOrFileLikeObject to the constant `INVALID_KEY`.
 * Returns true if markdown is enabled and the generated key is not invalid; otherwise, returns false.
 *
 * @async
 * @returns {Promise<boolean>} True if markdown is enabled and the generated key is valid; false otherwise.
 */
async function isMarkdownEnabledAndKeyValid() {
  // Check if markdown mode is enabled
  const markdownEnabled = isMarkdownEnabled();
  if (!markdownEnabled) {
    return false;
  }

  // Generate the key asynchronously
  const generatedKey = await generateKey();

  // Compare the generated key to the invalid key constant
  return generatedKey !== INVALID_KEY;
}

module.exports = isMarkdownEnabledAndKeyValid;