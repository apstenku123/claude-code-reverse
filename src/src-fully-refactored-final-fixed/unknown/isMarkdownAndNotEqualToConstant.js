/**
 * Checks if the markdown mode is enabled and if the result of resolveRuntimeSource() is not equal to the constant HO.
 *
 * @async
 * @function isMarkdownAndNotEqualToConstant
 * @returns {Promise<boolean>} Returns true if markdown mode is enabled and resolveRuntimeSource() does not return HO; otherwise, false.
 */
const isMarkdownAndNotEqualToConstant = async () => {
  // Check if markdown mode is enabled
  const isMarkdownEnabled = md();

  // If markdown mode is not enabled, return false immediately
  if (!isMarkdownEnabled) {
    return false;
  }

  // Await the result of resolveRuntimeSource()
  const gK2Result = await resolveRuntimeSource();

  // Compare the result with the constant HO
  return gK2Result !== HO;
};

module.exports = isMarkdownAndNotEqualToConstant;
