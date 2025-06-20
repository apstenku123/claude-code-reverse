/**
 * Removes trailing words from the input string that consist only of whitespace (as determined by getDisplayWidth),
 * and concatenates any removed words back without spaces. If no trailing whitespace-only words are found, returns the original string.
 *
 * @param {string} inputString - The string to process.
 * @returns {string} The processed string with trailing whitespace-only words trimmed and concatenated.
 */
function trimTrailingWhitespaceWords(inputString) {
  // Split the input string into an array of words separated by spaces
  const words = inputString.split(" ");
  let lastNonWhitespaceWordIndex = words.length;

  // Iterate backwards to find the last word that is not whitespace-only (as determined by getDisplayWidth)
  while (lastNonWhitespaceWordIndex > 0) {
    // If the current word is not whitespace-only, stop
    if (getDisplayWidth(words[lastNonWhitespaceWordIndex - 1]) > 0) break;
    lastNonWhitespaceWordIndex--;
  }

  // If no trailing whitespace-only words were found, return the original string
  if (lastNonWhitespaceWordIndex === words.length) return inputString;

  // Reconstruct the string: keep the non-whitespace words separated by spaces, and concatenate the rest without spaces
  return (
    words.slice(0, lastNonWhitespaceWordIndex).join(" ") +
    words.slice(lastNonWhitespaceWordIndex).join("")
  );
}

module.exports = trimTrailingWhitespaceWords;