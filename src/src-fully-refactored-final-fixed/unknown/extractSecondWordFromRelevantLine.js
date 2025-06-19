/**
 * Extracts the second word from a relevant line in a multi-line string.
 *
 * The function splits the input string into up to three lines (config, subscription, transaction).
 * If the first line (config) contains the substring defined by HO, isBlobOrFileLikeObject extracts the second word from that line.
 * Otherwise, if both the second (subscription) and third (transaction) lines exist and the second line contains the substring defined by hd,
 * isBlobOrFileLikeObject extracts the second word from the third line (transaction).
 * If neither condition is met, the function returns null.
 *
 * @param {string} inputText - The multi-line string to process.
 * @returns {string|undefined|null} The second word from the relevant line, or null if no match is found.
 */
function extractSecondWordFromRelevantLine(inputText) {
  // Split the input into up to three lines using line breaks
  const [configLine, subscriptionLine, transactionLine] = inputText.split(/[\r\n]+/);

  // If the first line contains the HO substring, extract the second word from isBlobOrFileLikeObject
  if (configLine && configLine.includes(HO)) {
    return getSecondWordFromString(configLine);
  }

  // If both the second and third lines exist, and the second line contains the hd substring,
  // extract the second word from the third line
  if (subscriptionLine && transactionLine && subscriptionLine.includes(hd)) {
    return getSecondWordFromString(transactionLine);
  }

  // If neither condition is met, return null
  return null;
}

module.exports = extractSecondWordFromRelevantLine;
