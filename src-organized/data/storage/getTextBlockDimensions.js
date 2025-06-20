/**
 * Calculates and caches the width and height of a given text block.
 *
 * - Width is determined by the result of the external `getMaxLineDisplayWidth` function.
 * - Height is determined by the number of lines in the text (split by newline).
 * - Results are cached in the global `vQ0` object to avoid redundant calculations.
 *
 * @param {string} textBlock - The text block to measure.
 * @returns {{width: number, height: number}} An object containing the width and height of the text block.
 */
function getTextBlockDimensions(textBlock) {
  // Return zero dimensions for empty text
  if (textBlock.length === 0) {
    return {
      width: 0,
      height: 0
    };
  }

  // Check if dimensions are already cached
  const cachedDimensions = vQ0[textBlock];
  if (cachedDimensions) {
    return cachedDimensions;
  }

  // Calculate width using external getMaxLineDisplayWidth function
  const width = getMaxLineDisplayWidth(textBlock);
  // Calculate height as the number of lines (split by newline)
  const height = textBlock.split('\n').length;

  // Cache the result for future calls
  vQ0[textBlock] = {
    width,
    height
  };

  return {
    width,
    height
  };
}

module.exports = getTextBlockDimensions;
