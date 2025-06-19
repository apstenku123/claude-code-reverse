/**
 * Applies a set of string replacements to the input text and tracks which replacements were applied.
 *
 * Iterates over each entry in the replacement map (tG5), replacing all occurrences of the key in the input string
 * with its corresponding value. Tracks each replacement that results in a change, recording the original and replacement values.
 *
 * @param {string} inputText - The original string to process replacements on.
 * @returns {{ result: string, appliedReplacements: Array<{from: string, to: string}> }}
 *   An object containing the final string after all replacements and an array of applied replacements.
 */
function applyReplacementsWithTracking(inputText) {
  let processedText = inputText;
  const appliedReplacements = [];

  // Iterate over each replacement rule in tG5
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

module.exports = applyReplacementsWithTracking;