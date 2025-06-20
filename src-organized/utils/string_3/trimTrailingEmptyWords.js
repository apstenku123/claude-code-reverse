/**
 * Removes trailing words from a string if those words are considered "empty" by the getDisplayWidth function.
 * If no trailing empty words are found, returns the original string.
 * Otherwise, returns the string with trailing empty words concatenated without spaces.
 *
 * @param {string} input - The input string to process.
 * @returns {string} The processed string with trailing empty words handled.
 */
function trimTrailingEmptyWords(input) {
  // Split the input string into words separated by spaces
  const words = input.split(" ");
  let lastNonEmptyWordIndex = words.length;

  // Iterate backwards to find the last non-empty word according to getDisplayWidth
  while (lastNonEmptyWordIndex > 0) {
    // If the current word is not empty (getDisplayWidth returns > 0), stop
    if (getDisplayWidth(words[lastNonEmptyWordIndex - 1]) > 0) {
      break;
    }
    lastNonEmptyWordIndex--;
  }

  // If no trailing empty words were found, return the original string
  if (lastNonEmptyWordIndex === words.length) {
    return input;
  }

  // Concatenate non-empty words with spaces, then append the remaining words without spaces
  return (
    words.slice(0, lastNonEmptyWordIndex).join(" ") +
    words.slice(lastNonEmptyWordIndex).join("")
  );
}

module.exports = trimTrailingEmptyWords;