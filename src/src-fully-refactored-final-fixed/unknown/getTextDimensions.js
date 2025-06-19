/**
 * Calculates and caches the width and height of a given text input.
 *
 * If the input text has been processed before, returns the cached dimensions.
 * Otherwise, computes the width using the `getMaxLineDisplayWidth` function and height as the number of lines,
 * then caches and returns the result.
 *
 * @param {string} text - The input text to measure.
 * @returns {{width: number, height: number}} An object containing the width and height of the text.
 */
function getTextDimensions(text) {
  // Return zero dimensions for empty input
  if (text.length === 0) {
    return {
      width: 0,
      height: 0
    };
  }

  // Check if dimensions are already cached
  const cachedDimensions = vQ0[text];
  if (cachedDimensions) {
    return cachedDimensions;
  }

  // Compute width using the getMaxLineDisplayWidth function
  const width = getMaxLineDisplayWidth(text);
  // Compute height as the number of lines (split by newline)
  const height = text.split('\n').length;

  // Cache the computed dimensions
  vQ0[text] = {
    width,
    height
  };

  // Return the computed dimensions
  return {
    width,
    height
  };
}

module.exports = getTextDimensions;