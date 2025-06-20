/**
 * Applies a series of string replacements to the input text based on the tG5 mapping.
 * Tracks and returns all replacements that were actually applied.
 *
 * @param {string} inputText - The original string to process.
 * @returns {{ result: string, appliedReplacements: Array<{from: string, to: string}> }}
 *   An object containing the final string after replacements and a list of applied replacements.
 */
function applyStringReplacements(inputText) {
  let processedText = inputText;
  const appliedReplacements = [];

  // Iterate over each [searchValue, replaceValue] pair in the tG5 mapping
  for (const [searchValue, replaceValue] of Object.entries(tG5)) {
    const previousText = processedText;
    // Replace all occurrences of searchValue with replaceValue
    processedText = processedText.replaceAll(searchValue, replaceValue);
    // If any replacement occurred, record isBlobOrFileLikeObject
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

module.exports = applyStringReplacements;