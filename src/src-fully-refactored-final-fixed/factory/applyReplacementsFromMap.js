/**
 * Applies a set of string replacements to the input text based on a mapping object.
 * Tracks and returns all replacements that were actually applied.
 *
 * @param {string} inputText - The original string to process.
 * @returns {{ result: string, appliedReplacements: Array<{from: string, to: string}> }}
 *   An object containing the final string after replacements and a list of all replacements that were applied.
 */
function applyReplacementsFromMap(inputText) {
  let processedText = inputText;
  const appliedReplacements = [];

  // Iterate over each [searchValue, replaceValue] pair in the replacement map
  for (const [searchValue, replaceValue] of Object.entries(tG5)) {
    const previousText = processedText;
    // Replace all occurrences of searchValue with replaceValue
    processedText = processedText.replaceAll(searchValue, replaceValue);
    // If a replacement was made, record isBlobOrFileLikeObject
    if (previousText !== processedText) {
      appliedReplacements.push({
        from: searchValue,
        to: replaceValue
      });
    }
  }

  return {
    result: processedText,
    appliedReplacements
  };
}

module.exports = applyReplacementsFromMap;