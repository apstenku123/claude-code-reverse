/**
 * Pads a string to a specified length using a given padding character or string, aligning the original string
 * according to the specified alignment ('right', 'center', or default/left).
 *
 * @param {string} inputString - The original string to pad.
 * @param {number} currentLength - The current length of the string (or index to compare against desired length).
 * @param {string} paddingChar - The character or string to use for padding.
 * @param {('right'|'center'|string)} alignment - The alignment for padding: 'right', 'center', or any other value (defaults to left).
 * @returns {string} The padded string, aligned as specified.
 */
function padStringToLength(inputString, currentLength, paddingChar, alignment) {
  const desiredLength = FE(inputString); // FE: gets the target length for the string

  // Only pad if the current length + 1 is greater than or equal to the desired length
  if (currentLength + 1 >= desiredLength) {
    const paddingLength = currentLength - desiredLength;
    switch (alignment) {
      case "right": {
        // Pad on the left (right-align the original string)
        inputString = BA1(paddingChar, paddingLength) + inputString;
        break;
      }
      case "center": {
        // Split padding for center alignment
        const rightPadding = Math.ceil(paddingLength / 2);
        const leftPadding = paddingLength - rightPadding;
        inputString = BA1(paddingChar, leftPadding) + inputString + BA1(paddingChar, rightPadding);
        break;
      }
      default: {
        // Pad on the right (left-align the original string)
        inputString = inputString + BA1(paddingChar, paddingLength);
        break;
      }
    }
  }
  return inputString;
}

module.exports = padStringToLength;