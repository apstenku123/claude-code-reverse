/**
 * Extracts up to three lines from the input string, checks for specific markers, and processes them accordingly.
 *
 * @param {string} inputText - Multiline string containing configuration or command lines.
 * @returns {any} - The result of TK2 processing if a marker is found, otherwise null.
 */
function extractAndProcessConfigLines(inputText) {
  // Split the input into up to three lines using line breaks as delimiters
  const [configLine, subscriptionLine, actionLine] = inputText.split(/[\r\n]+/);

  // Check if the first line exists and contains the HO marker
  if (configLine && configLine.includes(HO)) {
    // Process the config line if HO marker is present
    return TK2(configLine);
  }

  // Check if both the second and third lines exist and if the second line contains the hd marker
  if (subscriptionLine && actionLine && subscriptionLine.includes(hd)) {
    // Process the third line if hd marker is present in the second line
    return TK2(actionLine);
  }

  // Return null if no conditions are met
  return null;
}

module.exports = extractAndProcessConfigLines;
