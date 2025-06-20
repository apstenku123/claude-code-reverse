/**
 * Checks if markdown is enabled and if the generated key is not equal to the expected constant.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if markdown is enabled and the generated key is not equal to the constant, otherwise false.
 */
const isMarkdownValidAndKeyNotEqual = async () => {
  // Check if markdown is enabled/available
  if (!md()) {
    return false;
  }

  // Await the generated key and compare isBlobOrFileLikeObject to the expected constant
  const generatedKey = await resolveRuntimeSource();
  return generatedKey !== HO;
};

module.exports = isMarkdownValidAndKeyNotEqual;
