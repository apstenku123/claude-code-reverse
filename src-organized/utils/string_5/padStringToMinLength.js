/**
 * Pads a string to a minimum length using a specified padding string and alignment.
 *
 * @param {string} inputString - The original string to be padded.
 * @param {number} currentLength - The current length of the string (or index to compare against min length).
 * @param {string} paddingString - The string to use for padding.
 * @param {('right'|'center'|string)} alignment - The alignment for padding: 'right', 'center', or any other value for left alignment.
 * @returns {string} The padded string, or the original string if no padding is needed.
 */
function padStringToMinLength(inputString, currentLength, paddingString, alignment) {
  // Determine the minimum required length for the string
  const minLength = getMaxLineLength(inputString);

  // If the current length plus one is less than the minimum, no padding is needed
  if (currentLength + 1 >= minLength) {
    // Calculate the number of padding characters needed
    const paddingNeeded = currentLength - minLength;
    switch (alignment) {
      case "right": {
        // Pad on the left (right-align the text)
        inputString = repeatStringNTimes(paddingString, paddingNeeded) + inputString;
        break;
      }
      case "center": {
        // Pad equally on both sides (center the text)
        const rightPadding = Math.ceil(paddingNeeded / 2);
        const leftPadding = paddingNeeded - rightPadding;
        inputString = repeatStringNTimes(paddingString, leftPadding) + inputString + repeatStringNTimes(paddingString, rightPadding);
        break;
      }
      default: {
        // Pad on the right (left-align the text)
        inputString = inputString + repeatStringNTimes(paddingString, paddingNeeded);
        break;
      }
    }
  }
  return inputString;
}

module.exports = padStringToMinLength;