/**
 * Inserts a configuration string and a subscription string after each line in the source text.
 * Handles both Unix (\n) and Windows (\r\n) line endings, preserving original line breaks.
 *
 * @param {string} sourceText - The source text to process, potentially containing multiple lines.
 * @param {string} configString - The string to insert after each line.
 * @param {string} subscriptionString - The string to append after each line and configString.
 * @returns {string} The processed string with configString and subscriptionString inserted after each line.
 */
function insertConfigAndSubscriptionAfterEachLine(sourceText, configString, subscriptionString) {
  let currentIndex = 0;
  let result = "";

  // Find the index of the next line break (\n)
  let nextLineBreakIndex = sourceText.indexOf("\n", currentIndex);

  // Loop through all line breaks in the source text
  while (nextLineBreakIndex !== -1) {
    // Check if the line ends with a carriage return (\r), i.e., Windows line ending
    const hasCarriageReturn = sourceText[nextLineBreakIndex - 1] === "\r";

    // Extract the current line, excluding the line break
    const line = sourceText.slice(
      currentIndex,
      hasCarriageReturn ? nextLineBreakIndex - 1 : nextLineBreakIndex
    );

    // Append the line, configString, the original line break, and subscriptionString
    result +=
      line +
      configString +
      (hasCarriageReturn ? "\r\n" : "\n") +
      subscriptionString;

    // Move to the character after the current line break
    currentIndex = nextLineBreakIndex + 1;
    nextLineBreakIndex = sourceText.indexOf("\n", currentIndex);
  }

  // Append any remaining text after the last line break
  result += sourceText.slice(currentIndex);

  return result;
}

module.exports = insertConfigAndSubscriptionAfterEachLine;
